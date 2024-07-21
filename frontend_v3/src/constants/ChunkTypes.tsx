import { ReactNode } from "react";

// API Imports
import { z } from "zod"
import { lectForm } from "./APITypes";
import { UseFormReturn } from "react-hook-form";

export const CHUNK_TYPES = {
    TEXT: 'TEXT',
    VIDEO: 'VIDEO',
    FLASHCARD: 'FLASHCARD'
}

// Lecture Interfaces

export interface VideoChunkJSON {
    type: typeof CHUNK_TYPES.VIDEO;
    order: number;
    url: string;
    title: string,
    description: string,
}

export interface VideoChunkProps {
    order: number;
    url: string;
    defaultEditMode: boolean;
    title: string;
    description: string
}

export interface EditVideoChunkProps {
    title: string;
    description: string;
    url?: string;
    children: ReactNode;
    onUpdate: (values: lectForm) => (void);
    form: UseFormReturn<lectForm>;
}

// Text Interfaces

export interface TextChunkJSON {
    type: typeof CHUNK_TYPES.TEXT;
    order: number;
    content: string;
}

export interface TextChunkProps {
    order: number;
    content?: string;
    defaultEditMode: boolean;
}

// Flashcard Interfaces

export interface FlashcardJSON {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
}

export interface FlashcardChunkProps{
    flashcards: FlashcardJSON[];
}

// Options Interface

export interface ChunkOptionsProps {
    onEditClick: () => void;
    onDeleteClick: () => void;
    isDialog: boolean;
}