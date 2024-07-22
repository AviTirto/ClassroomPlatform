import { VideoChunkJSON, TextChunkJSON, FlashcardChunkJSON } from "./ChunkTypes";

export type NBChunksContextType = (VideoChunkJSON | TextChunkJSON | FlashcardChunkJSON)[];

export type NBRenderChunksContextType = (chunk: VideoChunkJSON | TextChunkJSON | FlashcardChunkJSON) => (JSX.Element | null);

export type NBUpdateChunksContextType = (chunk: VideoChunkJSON | TextChunkJSON | FlashcardChunkJSON) => void;

export type NBDeleteChunksContextType = (order: number) => (void);

export type NBTitleContextType = string;

export type NBDescriptionContextType = string;

export type NBUpdateTitleContextType = (newTitle: string) => (void);

export type NBUpdateDescriptionContextType = (newDescription :string) => (void);

export type NBCreatedAtContextType = string;

export type NBUpdatedAtContextType = string;

export type NBNewCreatedAtContextType = () => (void);

export type NBNewUpdatedAtContextType = () => (void);