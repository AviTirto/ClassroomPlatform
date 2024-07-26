// Styling Imports
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Interface Imports
import { EditFlashcardChunkProps } from "@/constants/ChunkTypes";

export const EditFlashcardChunk: React.FC<EditFlashcardChunkProps> = ({ children, flashcards }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="max-w-2xl sm:max-w-2xl overflow-auto flex flex-col space-y-2">
                <SheetHeader>
                    <SheetTitle>Edit Flashcards</SheetTitle>
                    <SheetDescription>
                        Make changes or remove cards in this deck.
                    </SheetDescription>
                </SheetHeader>
                <Carousel orientation="vertical">
                    <CarouselContent>
                        {
                            flashcards.map(flashcard => {
                                return (
                                    <CarouselItem className="p-5 justify-center">
                                        <textarea className="w-full p-2">{flashcard.question}</textarea>
                                        {
                                            flashcard.options.map(option => {
                                                return <textarea className="w-full p-2">{option}</textarea>
                                            })
                                        }
                                        <textarea className="w-full p-2">{flashcard.answer}</textarea>
                                        <textarea className="w-full p-2">{flashcard.explanation}</textarea>
                                    </CarouselItem>
                                )
                            })
                        }
                    </CarouselContent>
                </Carousel>
            </SheetContent>
        </Sheet>
    )
}
