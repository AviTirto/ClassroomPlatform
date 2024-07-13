import React, { useState } from 'react'
import FlashcardList from './FlashcardList'
import FileUpload from './FileUpload';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

export default function TabsView() {
    const [savedView, setSavedView] = useState(false);
    const [flashcards, setFlashcards] = useState([]);

    function handleDeleteFlashcard(index) {
        const newFlashcards = flashcards.filter((flashcard, flashcardIndex) => {
            return flashcardIndex !== index
        })
        setFlashcards(newFlashcards)
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <button
                    className={`px-4 py-2 mr-2 ${savedView ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSavedView(true)}
                >
                    Generate
                </button>
                <button
                    className={`px-4 py-2 ${!savedView ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSavedView(false)}
                >
                    Saved
                </button>
            </div>
            <div className="course-display-area">
                {!savedView ? (
                    <div className="list-view">
                        Saved
                    </div>
                ) : (
                    <div className="">
                        <div className='container'>
                            <FlashcardList flashcards={flashcards} handleDeleteFlashcard={handleDeleteFlashcard} />
                        </div>
                        <FileUpload setFlashcards={setFlashcards} />
                    </div>
                )}
            </div>
            <Popover className="relative">
                <PopoverButton>Solutions</PopoverButton>
                <PopoverPanel anchor="bottom" className="flex flex-col">
                    <a href="/analytics">Analytics</a>
                    <a href="/engagement">Engagement</a>
                    <a href="/security">Security</a>
                    <a href="/integrations">Integrations</a>
                </PopoverPanel>
            </Popover>
        </div>
    )
}


