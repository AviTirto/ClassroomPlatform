import { useNBChunks, useNBRenderChunks } from "@/services/NBChunksProvider"

export default function Notebook() {
  const chunks = useNBChunks();
    const renderChunk = useNBRenderChunks();
  return (
    <div className="flex flex-col items-center">
      {chunks.map(chunk => {
        return renderChunk(chunk)
      })}
    </div>
  )
}
