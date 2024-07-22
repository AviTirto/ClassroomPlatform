import { useNBChunks, useNBRenderChunks } from "@/services/NBChunksProvider"
import FlashcardChunk from "@/components/NotebookChunks/FlashcardChunk/FlashcardChunk"

export default function Notebook() {
  const chunks = useNBChunks();
  const renderChunk = useNBRenderChunks();
  return (
    <div className="flex flex-col items-center">
      <div>
        {chunks.map(chunk => {
          return renderChunk(chunk)
        })}
      </div>
      <FlashcardChunk/>
    </div>
  )
}
