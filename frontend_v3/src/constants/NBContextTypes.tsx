import { VideoChunkJSON, TextChunkJSON } from "./ChunkTypes";

export type NBChunksContextType = (VideoChunkJSON | TextChunkJSON)[];

export type NBRenderChunksContextType = (chunk: VideoChunkJSON | TextChunkJSON) => (JSX.Element | null);

export type NBUpdateChunksContextType = (chunk: VideoChunkJSON | TextChunkJSON) => void;

export type NBDeleteChunksContextType = (order: number) => (void);

export type NBTitleContextType = string;

export type NBDescriptionContextType = string;

export type NBUpdateTitleContextType = (newTitle: string) => (void);

export type NBUpdateDescriptionContextType = (newDescription :string) => (void);

export type NBCreatedAtContextType = string;

export type NBUpdatedAtContextType = string;

export type NBNewCreatedAtContextType = () => (void);

export type NBNewUpdatedAtContextType = () => (void);