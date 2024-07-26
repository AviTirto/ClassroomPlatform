// Styling Imports
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Interface Imports
import { EditFlashcardChunkProps } from "@/constants/ChunkTypes";

export const EditFlashcardChunk: React.FC<EditFlashcardChunkProps> = ({ children, flashcards }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="max-w-2xl sm:max-w-2xl flex flex-col space-y-2">
                <SheetHeader>
                    <SheetTitle>Edit Flashcards</SheetTitle>
                    <SheetDescription>
                        Make changes or remove cards in this deck.
                    </SheetDescription>
                </SheetHeader>
                <Carousel
                    orientation="vertical"
                >
                    <CarouselContent>
                        {
                            flashcards.map(flashcard => {
                                return (
                                    <CarouselItem className="p-5 justify-center">
                                        <Card>
                                            <textarea className="w-full p-2">{flashcard.question}</textarea>
                                            {
                                                flashcard.options.map(option => {
                                                    return <textarea className="w-full p-2 text-sm">{option}</textarea>
                                                })
                                            }
                                            <textarea className="w-full p-2 text-sm">{flashcard.answer}</textarea>
                                            <textarea className="w-full p-2 text-sm">{flashcard.explanation}</textarea>
                                        </Card>
                                    </CarouselItem>
                                )
                            })
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </SheetContent>
        </Sheet>
    )
}
