import React, { useState, useRef, useEffect } from 'react';
import CardOptions from './components/CardOptions'

const Flashcard = ({ flashcard, index, handleDeleteFlashcard }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const optionRef = useRef(null)

  const adjustHeight = () => {
    const textarea = optionRef.current;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  const handleEdit = () => {
    setEditMode(!editMode)
  }

  useEffect(() => {
    adjustHeight();
  }, []);


  return (
    <div className="w-full rounded-lg p-5 mt-5 shadow-2xl font-mono text-gray-200 bg-gray-700 transition-all ease-in duration-300">
      <div>
        <div className="flex justify-between w-full">
          <h1 className="font-bold">{flashcard.question}</h1>
          <CardOptions index={index} onDelete={handleDeleteFlashcard} onEdit={handleEdit} />
        </div>
        <div>
          {flashcard.options.map((option, index) => (
            <>
              {
                editMode ? <textarea key={index} disabled={false} rows={1} className='resize-none bg-transparent text-white border-b w-full text-xs outline-0 h-fit overflow-hidden' onInput={adjustHeight} ref={optionRef} defaultValue={option}></textarea>
                  :
                  <button key={index} className='w-full bg-gray-600 text-xs rounded-full p-1 hover:bg-gray-500 active:bg-white active:text-gray-300 duration-200'>
                    {option}
                  </button>
              }
            </>
            // <p className='text-xs' key={index}>{option}</p>
          ))}
        </div>
      </div>
      <div className="flex justify-between w-full">
        <label>Answer</label>
        <label onClick={() => setShowAnswer(!showAnswer)} className="cursor-pointer">+</label>
      </div>
      <div className={`transition-all ease-in-out duration-300 overflow-hidden ${showAnswer ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'}`}>
        <b>{`${flashcard.answer}) `}</b>
        <label>{flashcard.explanation}</label>
      </div>
    </div>
  );
};

export default Flashcard;
