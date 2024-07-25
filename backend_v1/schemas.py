from pydantic import BaseModel, Field
from typing import List, Optional

class VideoChunksSchema(BaseModel):
    id: int
    notebook_id: int
    title: str
    order: int
    video_url: str
    subtitle_content: str
    embedding: List[float]

    class Config:
        orm_mode = True

class TextChunksSchema(BaseModel):
    id: int
    notebook_id: int
    title: str
    order: int
    text_content: str
    embedding: List[float]

    class Config:
        orm_mode = True

class DocumentChunksSchema(BaseModel):
    id: int
    notebook_id: int
    filename: str
    order: int
    filepath: str
    content_string: str
    embedding: List[float]

    class Config:
        orm_mode = True

class FlashcardChunksSchema(BaseModel):
    id: int
    notebook_id: int
    question: str
    order: int
    options: Optional[dict]
    explanation: str
    answer: int
    embedding: List[float]

    class Config:
        orm_mode = True

class NotebookSchema(BaseModel):
    id: int
    course_id: int
    title: str
    description: str
    video_chunks: List[VideoChunksSchema] = []
    text_chunks: List[TextChunksSchema] = []
    document_chunks: List[DocumentChunksSchema] = []
    flashcard_chunks: List[FlashcardChunksSchema] = []

    class Config:
        orm_mode = True

class CourseSchema(BaseModel):
    id: int
    title: str
    teacher_id: int
    notebooks: List[NotebookSchema] = []

    class Config:
        orm_mode = True

class TeacherSchema(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    courses: List[CourseSchema] = []

    class Config:
        orm_mode = True

#### TO DO: Split Notebook Schema into Notebook Base and Notebook Populated??? smth like that
# The base should just be id: int, course_id: int, title: str --> default title should be Untitled
