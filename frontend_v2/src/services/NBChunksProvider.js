import { useContext, useState, createContext } from 'react'
import { CHUNK_TYPES } from '../metadata/ChunkTypes';
import TextChunk from "../components/TextChunk";
import VideoChunk from '../components/VideoChunk';

const NBChunksContext = createContext();
const NBRenderChunksContext = createContext();
const NBUpdateChunksContext = createContext();
const NBDeleteChunksContext = createContext();

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

export function NBChunksProvider({ children }) {
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

    const renderChunk = (chunk) => {
        if (chunk.type === CHUNK_TYPES.TEXT) {
            return (
                <TextChunk
                    key={chunk.order}
                    order={chunk.order}
                    content={chunk.content}
                    defaultEditMode={chunk.content.length === 0 ? true : false}
                />
            )
        } else if (chunk.type === CHUNK_TYPES.VIDEO) {
            return (
                <VideoChunk
                    key={chunk.order}
                    order={chunk.order}
                    url={chunk.url}
                    defaultEditMode={chunk.url.length === 0 ? true : false}
                />
            )
        }
    }

    const updateChunk = (chunk) => {
        const updatedChunks = [...chunks]
        updatedChunks[chunk.order] = chunk
        setChunks(updatedChunks)
    }

    const deleteChunk = (order) => {
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
