from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, JSON, Text, ARRAY, BLOB
from sqlalchemy.orm import relationship

from .database import Base


class Teacher(Base):
    __tablename__ = "teacher"

    id = Column(Integer, primary_key=True)
    first_name = Column(String(255), index=True)
    last_name = Column(String(255))
    email = Column(String(255))

    courses = relationship("Course", back_populates="teacher")

class Course(Base):
    __tablename__ = "course"
    
    id = Column(Integer, primary_key=True)
    title = Column(String(255), index=True)
    teacher_id = Column(Integer, ForeignKey('teacher.id'))

    teacher = relationship("Teacher", back_populates="courses")
    notebooks = relationship("Notebook", back_populates="course")


class Notebook(Base):
    __tablename__ = "notebook"
    
    id = Column(Integer, primary_key=True)
    course_id = Column(Integer, ForeignKey('course.id'))
    title = Column(String(255), index = True)
    description = Column(Text)

    course = relationship("Course", back_populates="notebooks")
    video_chunks = relationship("VideoChunks", back_populates="notebook")
    text_chunks = relationship("TextChunks", back_populates="notebook")
    document_chunks = relationship("DocumentChunks", back_populates="notebook")
    flashcard_chunks = relationship("FlashcardChunks", back_populates="notebook")

class VideoChunks(Base):
    __tablename__ = "video_chunks"
    
    id = Column(Integer)
    notebook_id = Column(Integer, ForeignKey("notebook.id"))
    title = Column(String(255), index = True)
    order = Column(Integer)
    video_url = Column(Text)
    subtitle_content = Column(Text)
    embedding = Column(BLOB)
    
    notebook = relationship("Notebook", back_populates="video_chunks")


class TextChunks(Base):
    __tablename__ = "text_chunks"

    id  = Column(Integer)
    notebook_id  = Column(Integer, ForeignKey("notebook.id"))
    title  = Column(String(255), index = True)
    order = Column(Integer)
    text_content = Column(Text)
    embedding = Column(BLOB)
    
    notebook = relationship("Notebook", back_populates="text_chunks")
    


class DocumentChunks(Base):
    __tablename__ = "document_chunks"

    id  = Column(Integer)
    notebook_id  = Column(Integer, ForeignKey("notebook.id"))
    filename  = Column(String(255), index = True)
    order = Column(Integer)
    filepath  = Column(String(255))
    content_string = Column(Text)
    embedding = Column(BLOB)
    
    notebook = relationship("Notebook", back_populates="document_chunks")


class FlashcardChunks(Base):
    __tablename__ = "flashcard_chunks"

    id  = Column(Integer)
    notebook_id  = Column(Integer, ForeignKey("notebook.id"))
    question  = Column(String(255))
    order = Column(Integer)
    options = Column(JSON)
    explanation = Column(Text)
    answer = Column(Integer)
    embedding = Column(BLOB)
    
    notebook = relationship("Notebook", back_populates="flashcard_chunks")
