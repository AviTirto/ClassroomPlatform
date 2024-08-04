from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
import google.generativeai as genai
import json
import re
import singlestoredb as s2
import cohere
from pytube import YouTube
from moviepy.editor import *
from youtube_transcript_api import YouTubeTranscriptApi
import asyncio
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv('GEMINI_API_KEY')
cohere_api_key = os.getenv('COHERE_KEY')
database_url = os.getenv('SINGLESTORE_DATABASE_URL')
genai.configure(api_key = api_key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173"
    ], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

def convertJSONList(text):
    jsons = re.findall(r'({[^}]*})', text)
    json_list = []
    for obj in jsons:
        json_list += [json.loads(obj)]
    return json_list

@app.post("/uploadfile")
async def upload_file(file: UploadFile):
    reader = PdfReader(file.file)
    content = ""
    for page in reader.pages:
        content += "\n"
        content += page.extract_text()

    model = genai.GenerativeModel('gemini-1.5-flash', generation_config={"response_mime_type": "application/json"})

    prompt = """
    Make study flashcards.

    Using this JSON schema:

        Card = {
            "id": int,
            "question": str,
            "options": [str],
            "answer": this should be either (A, B, C, D, etc),
            "explanation": str
        }

    Return a `list[Card]`
    The flashcards should be based on the following content: 
    """

    response = model.generate_content(prompt + content)
    return convertJSONList(response.text)


@app.post("/upload_doc")
async def upload_file(file: UploadFile):
    # Create a connection to the database
    conn = s2.connect(database_url)
    
    with conn:
        with conn.cursor() as cur:

            # Insert New Document to Documents Table
            reader = PdfReader(file.file)
            query = f"""INSERT INTO documents (course_id, doc_name, num_chunks, doc_id) VALUES (0, "{file.filename}", {len(reader.pages)}, "{file.filename}")"""
            cur.execute(query)

            # Embed each page and add it to the doc_embedding table
            for page in reader.pages:
                text = page.extract_text()
                embedding = genai.embed_content(model='models/embedding-001',
                                                content=text,
                                                task_type="retrieval_document",
                                                title=file.filename)['embedding']
                query = "INSERT INTO doc_embedding (doc_id, content_str, vector) VALUES (%s,%s, JSON_ARRAY_PACK(%s))"
                cur.execute(query, (file.filename, text, json.dumps(embedding)))

            # After an entire document is added, then it is committed
            conn.commit()

@app.get("/files")
async def get_files():
    conn = s2.connect(database_url)
    
    with conn:
        with conn.cursor() as cur:
            cur.execute('SELECT * FROM documents')
            rows = []
            for row in cur.fetchall():
                rows += [row[2]]
            return rows
        
@app.post('/genai')
async def getQuestions(query):
    conn = s2.connect(database_url)
    with conn:
        with conn.cursor() as cur:
            embedding = genai.embed_content(model='models/embedding-001',
                                                content=query,
                                                task_type="retrieval_query",
                                            )['embedding']


            cur.execute(
                f"""
                    SELECT content_str, DOT_PRODUCT(JSON_ARRAY_PACK('{embedding}'), vector) as score
                    FROM doc_embedding
                    ORDER BY score DESC
                    limit 7;
                """
            )
            
            docs = []
            
            for row in cur.fetchall():
                docs += [row[0]]

            # Reranking
            co = cohere.Client(cohere_api_key)
            response = co.rerank(
                model="rerank-english-v3.0",
                query=query,
                documents=docs,
                top_n=3,
            )
            indexes = [res.index for res in response.results]

            content = ""
            for i in indexes:
                content+='\n'
                content += docs[i]
            print(content)


            model = genai.GenerativeModel('gemini-1.5-flash', generation_config={"response_mime_type": "application/json"})

            prompt = """
            Instructions for Question Generation:
            1. Generate questions based solely on the provided source material.
            2. Do not include any information or content that is not explicitly mentioned in the source material.
            3. If a question references a sample story or problem, ensure that the full context of the story or problem is provided within the question itself.
            4. DO NOT MENTION EXAMPLES IN THE TEXT. Instead change the situation and explain it in the question.
            
            Your task is to generate questions that demonstrate a deep understanding of the content within the provided source material, adhering strictly to the guidelines above.

            Using this JSON schema:

            Card = {
                "id": int,
                "question": str,
                "options": [str],
                "answer": int (the index of the option that is the answer),
                "explanation": str
            }

            Return a `list[Card]`
            The flashcards should be based on the following content: 
            """

            response = model.generate_content(prompt + content)
            return convertJSONList(response.text)

class Subtitle:
    def __init__(self, index, second, content):
        self.index = index
        self.second = int(second)
        self.content = content
    
    def get_timestamp(self):
        hours, remainder = divmod(self.second, 3600)
        minutes, seconds = divmod(remainder, 60)
        return f'{hours:02}:{minutes:02}:{seconds:02}'

@app.post('/upload_lecture')
async def parse_timestamps(link: str):
    yt = YouTube(link)
    video_id = re.search(r"v=([^&]+)", link).group(1)
    try:
        captions = YouTubeTranscriptApi.get_transcript(video_id, languages=['en', 'a.en'])
    except Exception:
        print(YouTubeTranscriptApi.list_transcript(video_id))
        print("No English Subtitles")
        return None

    if not captions:
        return None

    chunked_subtitles = []
    content_chunk = ""
    for index, caption in enumerate(captions):
        if index % 16 == 0:
            start_second = caption["start"]
        content_chunk += f'\n{caption["text"]}'
        if (index + 1) % 16 == 0 or index == len(captions) - 1:
            chunked_subtitles.append(Subtitle(index // 16, start_second, content_chunk))
            content_chunk = ""

    conn = s2.connect(database_url)
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO lectures (lecture_id, lecture_title, course_id, num_chunks) VALUES (%s, %s, %s, %s);",
                (link, yt.title, 'A', len(chunked_subtitles))
            )
            conn.commit()

        data = []
        for sub in chunked_subtitles:
            embedding = genai.embed_content(
                model='models/embedding-001',
                content=sub.content,
                task_type="retrieval_document",
                title=yt.title
            )['embedding']

            data.append({
                'lecture_id': link,
                'content_str': sub.content,
                'start_second': sub.second,
                'start_timestamp': sub.get_timestamp(),
                'subtitle_index': sub.index,
                'vector': json.dumps(embedding)
            })
        
        insert_query = """
            INSERT INTO subtitle_embedding 
            (lecture_id, content_str, start_second, start_timestamp, subtitle_index, vector)
            VALUES (%s, %s, %s, %s, %s, JSON_ARRAY_PACK(%s))
        """
        with conn.cursor() as cursor:
            for sub in data:
                for _ in range(3):
                    try:
                        cursor.execute(insert_query, (sub['lecture_id'], sub['content_str'], sub['start_second'], sub['start_timestamp'], sub['subtitle_index'], sub['vector']))
                        conn.commit()
                        break
                    except Exception as e:
                        print(f"Error inserting row: {e}")
                        print(sub['start_second'])
                        await asyncio.sleep(2)
    except Exception as e:
        return {"status": "error", "message": f"Error: {e}"}
    finally:
        conn.close()

    return {"status": "success", "message": "Lecture and subtitles processed successfully"}

@app.post('/clean_lecture')
async def clearLecture(link: str):
    conn = s2.connect(database_url)
    with conn:
        with conn.cursor() as cur:
            query = f"""
                DELETE FROM subtitle_embedding WHERE lecture_id = "{link}";
            """
            data = (link.strip())
            cur.execute(query)
            query = f"""
                DELETE FROM lectures WHERE lecture_id = "{link}";
            """
            data = (link.strip())
            cur.execute(query)
        conn.commit()
    return "Sucess"


@app.get('/query_lecture')
async def getTimestamps(query: str):
    print(query)
    conn = s2.connect(database_url)
    with conn:
        with conn.cursor() as cur:
            embedding = genai.embed_content(model='models/embedding-001',
                                                content=query,
                                                task_type="retrieval_query",
                                            )['embedding']


            cur.execute(
                f"""
                    SELECT content_str, start_second, start_timestamp, subtitle_index, DOT_PRODUCT(JSON_ARRAY_PACK('{embedding}'), vector) as score
                    FROM subtitle_embedding
                    ORDER BY score DESC
                    limit 10;
                """
            )
            
            ids = []
            subtitles = []
            seconds = []
            s_timestamps = []
            for row in cur.fetchall():
                subtitles += [row[0]]
                seconds += [int(row[1])]
                s_timestamps += [row[2]]
                ids += [row[3]]

            formatted_content = ""

            for i in range(len(subtitles)):
                formatted_content += f"\n\nID {i}: {subtitles[i]}"

            model = genai.GenerativeModel('gemini-1.5-flash', generation_config={"response_mime_type": "application/json"})

            prompt = """
            You are a video editor tasked with selecting clips from a lecture video that answers the following question: %s

            You will be provided the transcripts of a couple of clips along with their ID number.

            Your job is to select 1 or more clips that best answer the question and return a list of IDs(List[int])

            Here are the clips: 

            %s
            """ % (query, formatted_content)

            response = model.generate_content(prompt)

            matches = re.findall(r'\d+', response.text)
            selected_clips = list(map(int, matches))

            timestamps = []
            for i in selected_clips:
                
                timestamp = {
                    "label": f'{s_timestamps[i]}',
                    "seconds": seconds[i],
                    "content": {subtitles[i][:80] + '...'}
                }
                timestamps += [timestamp]

            unique_timestamps = []
            for timestamp in timestamps:
                if timestamp not in unique_timestamps:
                    unique_timestamps.append(timestamp)

            return unique_timestamps