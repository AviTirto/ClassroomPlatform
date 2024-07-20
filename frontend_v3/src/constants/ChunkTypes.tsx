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

export interface VideoChunkJSON {
    type: typeof CHUNK_TYPES.VIDEO;
    order: number;
    url: string;
    title: string,
    description: string,
}

export interface TextChunkJSON {
    type: typeof CHUNK_TYPES.TEXT;
    order: number;
    content: string;
}

export interface VideoChunkProps {
    order: number;
    url: string;
    defaultEditMode: boolean;
    title: string;
    description: string
}

export interface TextChunkProps {
    order: number;
    content?: string;
    defaultEditMode: boolean;
}

export interface EditVideoChunkProps {
    title: string;
    description: string;
    url?: string;
    children: ReactNode;
    onUpdate: (values: lectForm) => (void);
    form: UseFormReturn<lectForm>;
}

export interface ChunkOptionsProps {
    onEditClick: () => void;
    onDeleteClick: () => void;
    isDialog: boolean;
}