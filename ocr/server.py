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
import srt
from srt import Subtitle


api_key = "***REMOVED***"
genai.configure(api_key = api_key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust as per your React app's origin
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
    # print(type(response.text))
    return convertJSONList(response.text)


@app.post("/upload_doc")
async def upload_file(file: UploadFile):
    # Create a connection to the database
    conn = s2.connect('***REMOVED***')
    
    with conn:
        with conn.cursor() as cur:

            # Insert New Document to Documents Table
            reader = PdfReader(file.file)
            query = f"INSERT INTO documents (course_id, doc_name, num_chunks, doc_id) VALUES (0, '{file.filename}', {len(reader.pages)}, '{file.filename}')"
            cur.execute(query)

            # Embed each page and add it to the doc_embedding table
            for page in reader.pages:
                text = page.extract_text()
                embedding = genai.embed_content(model='models/embedding-001',
                                                content=text,
                                                task_type="retrieval_document",
                                                title=file.filename)
                query = f"""
                    INSERT INTO doc_embedding (doc_id, content_str, vector)
                    VALUES ('{file.filename}','{text}', JSON_ARRAY_PACK('{embedding['embedding']}'))"""
                cur.execute(query)

            # After an entire document is added, then it is committed
            conn.commit()

@app.get("/files")
async def get_files():
    conn = s2.connect('***REMOVED***')
    
    with conn:
        with conn.cursor() as cur:
            cur.execute('SELECT * FROM documents')
            rows = []
            for row in cur.fetchall():
                rows += [row[2]]
            return rows
        
@app.post('/genai')
async def getQuestions(query):
    conn = s2.connect('***REMOVED***')
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
            co = cohere.Client("***REMOVED***")
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
                "answer": this should be either (A, B, C, D, etc),
                "explanation": str
            }

            Return a `list[Card]`
            The flashcards should be based on the following content: 
            """

            response = model.generate_content(prompt + content)
            # print(type(response.text))
            return convertJSONList(response.text)
        
@app.post('/upload_lecture')
async def parseTimestamps(link: str):
    # Create a YouTube object
    yt = YouTube(link)
    yt.bypass_age_gate()
    caption = yt.captions['a.en']
    parsed_subtitles = srt.parse(caption.generate_srt_captions())
    parsed_subtitles = [sub for sub in parsed_subtitles if sub.content != ' ' and sub.content != '']
    chunked_subtitles = []

    start_timestamp = None
    content_chunk = ""
    count = 0
    index = 0
    for i in range(len(parsed_subtitles)):
        if count == 0:
            start_timestamp = parsed_subtitles[i].start

        count += 1
        if count == len(parsed_subtitles) - 1:
            content_chunk+=f'\n{parsed_subtitles[i].content}'
            chunked_subtitles+=[Subtitle(index, start_timestamp, parsed_subtitles[i].end, content_chunk)]
        elif count == 16:
            content_chunk+=f'\n{parsed_subtitles[i].content}'
            chunked_subtitles+=[Subtitle(index, start_timestamp, parsed_subtitles[i].end, content_chunk)]
            count = 0
            index += 1
            start_timestamp = None
            content_chunk = ""
        else:
            content_chunk+=f'\n{parsed_subtitles[i].content}'

    conn = s2.connect('***REMOVED***')
    with conn:
        with conn.cursor() as cur:
            print("STARTING THE UPLOAD")
            query = """
                INSERT INTO lectures (lecture_id, lecture_title, course_id, num_chunks)
                VALUES (%s, %s, %s, %s);
            """
            data = (yt.title, yt.title, 'A', len(chunked_subtitles))
            cur.execute(query, data)

            for sub in chunked_subtitles:
                embedding = genai.embed_content(model='models/embedding-001',
                                                content=sub.content,
                                                task_type="retrieval_document",
                                                title=yt.title)['embedding']

                upload_query = f"""
                    INSERT INTO subtitle_embedding (lecture_id, content_str, start_time, end_time, subtitle_index, vector)
                    VALUES ("A", "{sub.content}", "{srt.timedelta_to_srt_timestamp(sub.start)}","{srt.timedelta_to_srt_timestamp(sub.end)}", "{sub.index}", JSON_ARRAY_PACK("{embedding}"))
                """
                cur.execute(upload_query)
    
        conn.commit()

    # Select the highest quality video
    # caption = yt.captions.get_by_language_code('en')

    # return caption.generate_srt_caption()


@app.get('/query_lecture')
async def getTimestamps(query: str):
    conn = s2.connect('***REMOVED***')
    with conn:
        with conn.cursor() as cur:
            embedding = genai.embed_content(model='models/embedding-001',
                                                content=query,
                                                task_type="retrieval_query",
                                            )['embedding']


            cur.execute(
                f"""
                    SELECT content_str, start_time, end_time, subtitle_index, DOT_PRODUCT(JSON_ARRAY_PACK('{embedding}'), vector) as score
                    FROM subtitle_embedding
                    ORDER BY score DESC
                    limit 10;
                """
            )
            
            ids = []
            subtitles = []
            start_times = []
            end_times = []
            for row in cur.fetchall():
                subtitles += [row[0]]
                start_times += [row[1]]
                end_times += [row[2]]
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
                parse_start_time = start_times[i].split(",")[0].split(":")
                seconds = (int(parse_start_time[0]) * 3600) + (int(parse_start_time[1]) * 60) + int(parse_start_time[2]) - 5
                timestamp = {
                    "label": f'{start_times[i]} - {end_times[i]}',
                    "seconds": seconds
                }
                timestamps += [timestamp]
            return timestamps
            
            


            
                


# Hugging Face Token: ***REMOVED***
# Cohere API: ***REMOVED***
            
# "https://api-inference.huggingface.co/models/re2g/re2g-reranker-trex"