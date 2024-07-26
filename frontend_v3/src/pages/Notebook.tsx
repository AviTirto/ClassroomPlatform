import { useNBChunks, useNBRenderChunks } from "@/services/NBChunksProvider"
import FlashcardChunk from "@/components/NotebookChunks/FlashcardChunk/FlashcardChunk"

export default function Notebook() {
  const chunks = useNBChunks();
  const renderChunk = useNBRenderChunks();
  return (
    <div className="flex flex-col items-center space-y-10 py-10">
      <div>
        <h1 className="font-bold text-xl">Notebook Title</h1>
        <p className="text-sm">This is a notebook description</p>
      </div>
      <div className="flex flex-col space-y-5">
        {chunks.map(chunk => {
          return renderChunk(chunk)
        })}
      </div>
      <FlashcardChunk />
    </div>
  )
}
