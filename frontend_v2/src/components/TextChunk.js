import { useState, useRef } from 'react';
import ChunkOptions from './ChunkOptions';
import { CHUNK_TYPES } from '../metadata/ChunkTypes';
import { useNBDeleteChunks, useNBUpdateChunks } from '../services/NBChunksProvider';
import { useNewUpdatedAt } from '../services/NBTimestampProvider';

export default function TextChunk({ order, content, defaultEditMode }) {
    const [editMode, setEditMode] = useState(defaultEditMode);
    const inputRef = useRef(null);
    const updateChunk = useNBUpdateChunks();
    const newUpdatedAt = useNewUpdatedAt();
    const deleteChunk = useNBDeleteChunks();

    function adjustHeight() {
        const inputArea = inputRef.current;

        if (inputArea) {
            inputArea.style.height = 'auto';
            inputArea.style.height = `${inputArea.scrollHeight}px`;
        }
    }

    function handleUpdate(){
        const updatedChunk = {
            type: CHUNK_TYPES.TEXT,
            'order': order,
            'content': inputRef.current.value,
        }

        updateChunk(updatedChunk);
        setEditMode(!editMode);
        newUpdatedAt();
        
    }

    const handleDelete = () => {
        deleteChunk(order);
    }

    return (
        <div className="border h-auto shadow-lg p-8 rounded-md flex flex-col space-y-4">
            {editMode ? (
                <textarea
                    ref={inputRef}
                    defaultValue={content}
                    disabled={false}
                    rows={5}
                    onInput={adjustHeight}
                    className='resize-none bg-transparent h-fit overflow-hidden border outline-0 rounded-md p-1 focus:border-blue-300 focus:border-2 focus:bg-white hover:bg-gray-50 duration-300' />
            ) : (
                <div>
                    <p>{content}</p>
                </div>
            )
            }
            <ChunkOptions 
                setEditMode={setEditMode}
                editMode={editMode}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                className="animate-pulse animate-none" 
            />
        </div>
    )
}
