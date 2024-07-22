import { useContext, useState, createContext } from 'react'
import { CHUNK_TYPES, VideoChunkJSON, TextChunkJSON, FlashcardChunkJSON } from '@/constants/ChunkTypes';
import { TextChunk } from '@/components/NotebookChunks/TextChunk';
import { VideoChunk } from '@/components/NotebookChunks/VideoChunk/VideoChunk';
import { FlashcardChunk2 } from '@/components/NotebookChunks/FlashcardChunk/FlashcardChunk2'
import { NBChunksContextType, NBRenderChunksContextType, NBUpdateChunksContextType, NBDeleteChunksContextType } from '@/constants/NBContextTypes'
import { NBChunksProviderProps } from '@/constants/NBProviderProps';

export const useNBChunks = () => {
    return useContext(NBChunksContext)
}

export const useNBRenderChunks = () => {
    return useContext(NBRenderChunksContext)
}

export const useNBUpdateChunks = () => {
    return useContext(NBUpdateChunksContext)
}

export const useNBDeleteChunks = () => {
    return useContext(NBDeleteChunksContext)
}

const NBChunksContext = createContext<NBChunksContextType>([]);
const NBRenderChunksContext = createContext<NBRenderChunksContextType>(() => { return null });
const NBUpdateChunksContext = createContext<NBUpdateChunksContextType>(useNBUpdateChunks);
const NBDeleteChunksContext = createContext<NBDeleteChunksContextType | undefined>(undefined);

export function NBChunksProvider({ children }: NBChunksProviderProps) {
    const [chunks, setChunks] = useState([
        {
            type: CHUNK_TYPES.TEXT,
            order: 0,
            content: ""
        },
        {
            type: CHUNK_TYPES.VIDEO,
            order: 1,
            url: "",
            title: "Example Title",
            description: "This is an example description"
        },
        {
            type: CHUNK_TYPES.FLASHCARD,
            title: "Flashcards Title",
            order: 2,
            flashcards: [
                {
                    question: "Question 1",
                    options: [
                        "option 1",
                        "option 2",
                        "option 3",
                        "option 4"
                    ],
                    answer: 1,
                    explanation: "This is the explanation"
                },
                {
                    question: "Question 2",
                    options: [
                        "option 1 for second quesion",
                        "option 2 for second question",
                        "option 3 for second question",
                        "option 4 for second question"
                    ],
                    answer: 3,
                    explanation: "This is the explanation for second question"
                },
                {
                    question: "Question 3",
                    options: [
                        "option 1 for third quesion",
                        "option 2 for third question",
                        "option 3 for third question",
                        "option 4 for third question"
                    ],
                    answer: 3,
                    explanation: "This is the explanation for third question"
                }
            ]
        }
    ])

    const renderChunk = (chunk: VideoChunkJSON | TextChunkJSON | FlashcardChunkJSON) => {

        if (chunk.type === CHUNK_TYPES.TEXT) {
            const textChunk = chunk as TextChunkJSON;
            return (
                <TextChunk
                    key={textChunk.order}
                    order={textChunk.order}
                    content={textChunk.content}
                    defaultEditMode={textChunk.content.length === 0 ? true : false}
                />
            )
        } else if (chunk.type === CHUNK_TYPES.VIDEO) {
            const videoChunk = chunk as VideoChunkJSON;
            return (
                <VideoChunk
                    key={videoChunk.order}
                    order={videoChunk.order}
                    url={videoChunk.url}
                    defaultEditMode={videoChunk.url.length === 0 ? true : false}
                    title={videoChunk.title}
                    description={videoChunk.description}
                />
            )
        } else if (chunk.type === CHUNK_TYPES.FLASHCARD) {
            const flashcardChunk = chunk as FlashcardChunkJSON
            return (
                <FlashcardChunk2
                    key={flashcardChunk.order}
                    title={flashcardChunk.title}
                    flashcards={flashcardChunk.flashcards}
                />
            )
        } else {
            return null
        }
    }

    const updateChunk = (chunk: VideoChunkJSON | TextChunkJSON | FlashcardChunkJSON) => {
        const updatedChunks = [...chunks]
        updatedChunks[chunk.order] = chunk
        setChunks(updatedChunks)
    }

    const deleteChunk = (order: number) => {
        const updatedChunks = chunks.filter(chunk => {
            return chunk.order !== order
        })
        setChunks(updatedChunks)
    }

    return (
        <NBChunksContext.Provider value={chunks}>
            <NBRenderChunksContext.Provider value={renderChunk}>
                <NBUpdateChunksContext.Provider value={updateChunk}>
                    <NBDeleteChunksContext.Provider value={deleteChunk}>
                        {children}
                    </NBDeleteChunksContext.Provider>
                </NBUpdateChunksContext.Provider>
            </NBRenderChunksContext.Provider>
        </NBChunksContext.Provider>
    )
}
