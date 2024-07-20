/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tfK8ROtouSr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FlashcardChunk() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(false)
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
          <h2 className="text-2xl font-bold mb-4">{flashcards[currentIndex].question}</h2>
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
    </div>
  )
}