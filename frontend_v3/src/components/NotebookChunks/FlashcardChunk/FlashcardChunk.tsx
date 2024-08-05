/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FCSLbDPbU3d
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer"

export default function FlashcardChunk() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const flashcards = [
    {
      question: "What is the capital of France?",
      answers: [
        "Paris, the beautiful city of lights and romance, is the capital of France.",
        "London, the vibrant capital of the United Kingdom.",
        "Berlin, the historic capital of Germany.",
        "Madrid, the lively capital of Spain.",
      ],
      correctAnswer: 0,
      explanation:
        "Paris is the capital of France, known for its iconic landmarks like the Eiffel Tower, Notre-Dame Cathedral, and the Louvre Museum. It is a global center of art, fashion, and culture.",
    },
    {
      question: "What is the largest planet in our solar system?",
      answers: [
        "Earth, the blue and green planet we call home.",
        "Mars, the red planet known for its vast deserts.",
        "Jupiter, the giant gas planet with its iconic Great Red Spot.",
        "Saturn, the ringed planet with its stunning icy rings.",
      ],
      correctAnswer: 2,
      explanation:
        "Jupiter is the largest planet in our solar system, a massive gas giant with a diameter of over 139,000 kilometers. It is known for its iconic Great Red Spot, a massive storm larger than Earth.",
    },
    {
      question: "What is the currency used in Japan?",
      answers: [
        "The US Dollar, the world's reserve currency.",
        "The Euro, the common currency of the European Union.",
        "The Japanese Yen, the official currency of Japan.",
        "The British Pound, the currency of the United Kingdom.",
      ],
      correctAnswer: 2,
      explanation:
        "The Japanese Yen is the official currency of Japan. It is one of the most traded currencies in the world and is known for its stability and strength.",
    },
    {
      question: "What is the tallest mammal in the world?",
      answers: [
        "The African Elephant, the largest land animal.",
        "The Giraffe, the towering mammal with a long neck.",
        "The White Rhinoceros, the second-largest land animal.",
        "The Hippopotamus, the massive semi-aquatic mammal.",
      ],
      correctAnswer: 1,
      explanation:
        "The Giraffe is the tallest mammal in the world, with an average height of 4.3 to 5.7 meters. They are known for their long necks and legs, which allow them to reach the highest leaves in the trees.",
    },
  ]
  const handleAnswerClick = (index) => {
    setSelectedAnswer(index)
    const isCorrect = index === flashcards[currentIndex].correctAnswer
    setIsCorrect(isCorrect)
  }
  const handlePreviousClick = () => {
    setSelectedAnswer(null)
    setIsCorrect(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length)
  }
  const handleNextClick = () => {
    setSelectedAnswer(null)
    setIsCorrect(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length)
  }
  const handleExplanationClick = () => {
    setShowExplanation(true)
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-full max-w-3xl p-8">
        <div
          className={`bg-white shadow-lg rounded-lg p-8 transform transition-all duration-500 ${
            isCorrect
              ? "hover:scale-110 hover:rotate-3 bg-green-400"
              : selectedAnswer !== null && !isCorrect
              ? "bg-red-400"
              : ""
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{flashcards[currentIndex].question}</h2>
            <Button variant="outline" onClick={handleExplanationClick}>
              Explanation
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {flashcards[currentIndex].answers.map((answer, index) => (
              <button
                key={index}
                className={`bg-gray-200 hover:bg-gray-300 rounded-lg py-6 px-8 transition-colors ${
                  selectedAnswer === index ? (isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white") : ""
                }`}
                onClick={() => handleAnswerClick(index)}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button disabled={currentIndex === 0} onClick={handlePreviousClick} className="mr-4">
            Previous
          </Button>
          <Button onClick={handleNextClick}>Next</Button>
        </div>
      </Card>
      {showExplanation && (
        <Drawer>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Explanation</DrawerTitle>
              <DrawerDescription>{flashcards[currentIndex].explanation}</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  )
}