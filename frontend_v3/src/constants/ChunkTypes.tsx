import { ReactNode } from "react";

export const CHUNK_TYPES = {
    TEXT: 'TEXT',
    VIDEO: 'VIDEO',
    FLASHCARD: 'FLASHCARD'
}

export interface VideoChunkJSON {
    type: typeof CHUNK_TYPES.VIDEO;
    order: number;
    url: string;
}

export interface TextChunkJSON {
    type: typeof CHUNK_TYPES.TEXT;
    order: number;
    content: string;
}

export interface VideoChunkProps {
    order: number;
    url?: string;
    defaultEditMode: boolean;
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
}

export interface ChunkOptionsProps {
    onEditClick: () => void;
    onDeleteClick: () => void;
    isDialog: boolean;
}