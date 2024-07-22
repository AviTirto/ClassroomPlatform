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

export interface FlashcardChunkJSON {
    type: typeof CHUNK_TYPES.FLASHCARD;
    order: number;
    title: string;
    flashcards: FlashcardJSON[];
}

export interface FlashcardProps {
    flashcard: FlashcardJSON
}

export interface FlashcardChunkProps{
    title: string;
    flashcards: FlashcardJSON[];
}

export interface EditFlashcardChunkProps{
    children: ReactNode;
    flashcards: FlashcardJSON[];
}

// Options Interface

export const EDIT_TYPES = {
    default: "default",
    dialog: "dialog",
    sheet: "sheet"
}

export type EditType = typeof EDIT_TYPES[keyof typeof EDIT_TYPES];

export interface ChunkOptionsProps {
    onEditClick: () => void;
    onDeleteClick: () => void;
    editType: EditType;
}