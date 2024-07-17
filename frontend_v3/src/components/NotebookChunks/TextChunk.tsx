import { TextChunkProps } from "@/constants/ChunkTypes"

export const TextChunk: React.FC<TextChunkProps> = ({ order, content, defaultEditMode }) => {
    return(
        <>
            {order}
            {content}
            {defaultEditMode}
        </>
    )
}
