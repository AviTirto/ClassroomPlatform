import { useContext, useState, createContext } from 'react'
import { CHUNK_TYPES, VideoChunkJSON, TextChunkJSON } from '@/constants/ChunkTypes';
import { TextChunk } from '@/components/NotebookChunks/TextChunk';
import { VideoChunk } from '@/components/NotebookChunks/VideoChunk/VideoChunk';
import { NBChunksContextType, NBRenderChunksContextType, NBUpdateChunksContextType, NBDeleteChunksContextType } from '@/constants/NBContextTypes'
import { NBChunksProviderProps } from '@/constants/NBProviderProps';

const NBChunksContext = createContext<NBChunksContextType | undefined>(undefined);
const NBRenderChunksContext = createContext<NBRenderChunksContextType | undefined>(undefined);
const NBUpdateChunksContext = createContext<NBUpdateChunksContextType | undefined>(undefined);
const NBDeleteChunksContext = createContext<NBDeleteChunksContextType | undefined>(undefined);

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
            url: ""
        }
    ])

    const renderChunk = (chunk: VideoChunkJSON | TextChunkJSON) => {
        
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
                />
            )
        } else {
            return null
        }
    }

    const updateChunk = (chunk: VideoChunkJSON | TextChunkJSON) => {
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
        <NBChunksContext.Provider value={ chunks }>
            <NBRenderChunksContext.Provider value={ renderChunk }>
                <NBUpdateChunksContext.Provider value={ updateChunk }>
                    <NBDeleteChunksContext.Provider value = { deleteChunk }>
                        {children}
                    </NBDeleteChunksContext.Provider>
                </NBUpdateChunksContext.Provider>
            </NBRenderChunksContext.Provider>
        </NBChunksContext.Provider>
    )
}
