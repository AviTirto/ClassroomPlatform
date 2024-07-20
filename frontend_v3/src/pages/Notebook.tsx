import { VideoChunk } from "@/components/NotebookChunks/VideoChunk/VideoChunk"

export default function Notebook() {
    return (
      <div className="flex flex-col items-center">
        {/* <TextChunk order={2} content="Sample" defaultEditMode={false}/> */}
        <VideoChunk order={1} url="youtube.com" defaultEditMode={false} title="Title" description="description"/>
      </div>
    )
}
