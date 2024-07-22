// Styling Imports
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Interface Imports
import { EditFlashcardChunkProps } from "@/constants/ChunkTypes";

export const EditFlashcardChunk: React.FC<EditFlashcardChunkProps> = ({ children, flashcards }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers. Ya.
                    </SheetDescription>
                    {
                        flashcards.map(flashcard => {
                            return (
                                <>{flashcard.question}</>
                            )
                        })
                    }
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
