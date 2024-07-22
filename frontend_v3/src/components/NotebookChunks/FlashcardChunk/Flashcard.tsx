// Styling Imports
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

// Interface Imports
import { FlashcardProps } from "@/constants/ChunkTypes";

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
    return (
        <CarouselItem>
            <Card className="px-10 py-10 text-center flex flex-col space-y-2">
                <h2 className="text-lg font-bold">{flashcard.question}</h2>
                {
                    flashcard.options.map((option: string) => {
                        return (
                            <Button variant="outline" className="w-full px-3 h-fit">
                                <textarea
                                    className="resize-none w-full bg-inherit"
                                    disabled={true}
                                    value={option}
                                    rows={2}
                                />
                            </Button>
                        )
                    })
                }

                <Accordion
                    type="single"
                    collapsible
                >
                    <AccordionItem value="item-1">
                        <AccordionTrigger
                            className="text-sm"
                        >
                            Explanation
                        </AccordionTrigger>
                        <AccordionContent>
                            {flashcard.explanation}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Card>
        </CarouselItem>
    )
}
