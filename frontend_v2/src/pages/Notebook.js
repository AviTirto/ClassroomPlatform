import { useNBChunks, useNBRenderChunks } from "../services/NBChunksProvider"
import { useTitle, useUpdateTitle, useDescription, useUpdateDescription } from "../services/NBMetadataProvider"

export default function Notebook() {
    const chunks = useNBChunks()
    const renderChunk = useNBRenderChunks()
    const title = useTitle()
    const description = useDescription()
    return (
      <div className="p-40 flex flex-col space-y-8">
        <h1>{title}</h1>
        <p>{description}</p>
        {chunks.map(
            chunk => { return renderChunk(chunk) }
        )}
      </div>
    )
}
