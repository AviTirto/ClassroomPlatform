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

// React Funcionality Import
import { useState } from "react";

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
    const [isAnswered, setIsAnswered] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    function checkAnswer(option_index: number){
        console.log(option_index)
        setIsAnswered(true)
        if (option_index === flashcard.answer){
            setIsCorrect(true)
        }else{
            setIsCorrect(false)
        }
    }

    return (
        <CarouselItem>
            <Card className={`px-10 py-10 text-center flex flex-col space-y-2 ${
                isAnswered? 
                    isCorrect ?
                        'hover:scale-110 hover:rotate-3 bg-green-400'
                        :
                        'bg-red-400'
                :
                ''
                }`}>
                <h2 className="text-lg font-bold">{flashcard.question}</h2>
                {
                    flashcard.options.map((option: string) => {
                        return (
                            <Button 
                                variant="outline" 
                                className="w-full px-3 h-fit"
                                onClick={() => {checkAnswer(Number(flashcard.answer))}}
                            >
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
