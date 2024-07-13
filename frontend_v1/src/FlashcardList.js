import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList({ flashcards, handleDeleteFlashcard }) {

  return (
    <div className='card-grid columns-xs scroll-auto'>
      {
        flashcards.map((flashcard, flashcardIndex) => {
          console.log(flashcard.explanantion)
          return <Flashcard flashcard={flashcard} key={flashcardIndex} index={flashcardIndex} handleDeleteFlashcard ={handleDeleteFlashcard} />
        })
      }
    </div>
  )
}