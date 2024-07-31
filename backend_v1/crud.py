from . import models, schemas
from sqlalchemy.orm import session


# Get document chunks by notebook.id --> filename, order, filepath
def get_document_chunks(db: session, notebook_id : int):
    return db.query(models.DocumentChunks.filename, 
                    models.DocumentChunks.order,
                    models.DocumentChunks.filepath).filter(models.DocumentChunks.notebook_id == notebook_id).single()

# Get video chunks by notebook.id --> title, order, video_url
def get_video_chunks(db: session, notebook_id : int):
    return db.query(models.VideoChunks.title, 
                    models.VideoChunks.order,
                    models.VideoChunks.video_url).filer(models.VideoChunks.notebook_id == notebook_id).single()

# Get text chunks by notebook.id --> title, order, text_content
def get_text_chunks(db: session, notebook_id : int):
    return db.query(models.TextChunks.title, 
                    models.TextChunks.order, 
                    models.TextChunks.text_content).filter(models.TextChunks.notebook_id == notebook_id).single()

# Get flashcards chunks by notebook.id --> title, order, List[flashcards] = question, options, answer, explanation
def get_flashcards_chunks(db: session, notebook_id):
    return db.query(models.FlashcardsChunk.title, 
                    models.FlashcardsChunk.order,
                    models.FlashcardsChunk.flashcards).filter(models.FlashcardsChunk.notebook_id == notebook_id).single()


# Delete docuument chunks by  (notebook.id, order)
def delete_documnet_chunks(db : session, notebook_id : int, order : int):
    document_chunks = db.query(models.DocumentChunks).filter(models.DocumentChunks.notebook_id == notebook_id, 
                                                   models.DocumentChunks.order == order).all()
    if document_chunks == None:
        return None
    for document_chunk in document_chunks:
        db.delete(document_chunk)
    db.commit()
    return document_chunks

# Delete video chunks by  (notebook.id, order)
def delete_video_chunks(db: session, notebook_id: int, order: int) :
    video_chunks = db.query(models.VideoChunks).filter(models.VideoChunks.notebook_id == notebook_id, 
                                                       models.VideoChunks.order == order).all()
    if video_chunks == None:
        return None
    for video_chunk in video_chunks:
        db.delete(video_chunk)
    db.commit()
    return video_chunks

# Delete text chunks by (notebook.id, order)
def delete_text_chunks(db: session, notebook_id: int, order: int) :
    text_chunks = db.query(models.TextChunks).filter(models.TextChunks.notebook_id == notebook_id, 
                                                       models.TextChunks.order == order).all()
    if text_chunks == None:
        return None
    for text_chunk in text_chunks:
        db.delete(text_chunk)
    db.commit()
    return text_chunks

# Delete flashcards chunks by (notebook.id, order)
# This should also delete all rows with an associated flashcard_id from the flashcard table(this is a new table, check models.py)
def delete_flashcards_chunks(db: session, notebook_id: int, order: int) :
    pass

# Delete videos by (video_url, notebook_id, order)
# There will be multiple duplicate rows in the table with the same (video_url, notebook_id, order) but different subtitle_content and embedding
# This should include logic to update order for all chunks in the same notebook_id
# order - 1 for all chunks in the same notebook_id that come after the input order
def delete_videos(db: session, notebook_id: int, order: int) :
    pass


# Update video chunk title by (notebook_id, order, new_title)
# Ensure that it is a video chunk
#       - If the order does not exist in the VideoChunk table for that notebook_id, return None or smth.
def update_video_chunk(db : session, notebook_id : int, order : int, new_title : str):
    pass 

# Update text chunk title by (notebook_id, order, new_title)
# Type check, same as the video chunk
def update_text_chunk(db : session, notebook_id : int, order : int, new_title : str):
    pass 

# Update document chunk title by (notebook_id, order, new_title)
# Type check, same as the video chunk
def update_document_chunk(db : session, notebook_id : int, order : int, new_title : str):
    pass 

# Update flashcard chunk title by (notebook_id, order, new_title)
# Type check, same as the video chunk 
def update_flashcard_chunk(db : session, notebook_id : int, order : int, new_title : str):
    pass 