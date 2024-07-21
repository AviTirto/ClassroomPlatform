import { useNBChunks, useNBRenderChunks } from "@/services/NBChunksProvider"
import FlashcardChunk from "@/components/NotebookChunks/FlashcardChunk/FlashcardChunk"
import { FlashcardChunk2 } from "@/components/NotebookChunks/FlashcardChunk/FlashcardChunk2";

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
      <FlashcardChunk2 flashcards={[]}/>
    </div>
  )
}
