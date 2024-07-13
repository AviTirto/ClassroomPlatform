import { useState, useRef } from 'react';
import ChunkOptions from './ChunkOptions';
import ReactPlayer from "react-player";
import { CHUNK_TYPES } from '../metadata/ChunkTypes';
import { useNBDeleteChunks, useNBUpdateChunks } from '../services/NBChunksProvider';
import { useNewUpdatedAt } from '../services/NBTimestampProvider';
import './VideoChunk.css'

export default function VideoChunk({ order, url, defaultEditMode }) {
    const [editMode, setEditMode] = useState(defaultEditMode);
    const inputRef = useRef(null);
    const videoRef = useRef(null);
    const updateChunk = useNBUpdateChunks();
    const newUpdatedAt = useNewUpdatedAt();
    const deleteChunk = useNBDeleteChunks();

    function handleUpdate() {
        const updatedChunk = {
            type: CHUNK_TYPES.VIDEO,
            'order': order,
            'url': inputRef.current.value,
        }

        updateChunk(updatedChunk);
        setEditMode(!editMode);
        newUpdatedAt();

    }

    const handleDelete = () => {
        deleteChunk(order);
    }

    const setTimeStamp = (seconds) => {
        if (videoRef.current) {
            const internalPlayer = videoRef.current.getInternalPlayer();
            if (internalPlayer && internalPlayer.seekTo && internalPlayer.playVideo) {
                internalPlayer.seekTo(seconds, true);
                internalPlayer.playVideo();
            }
        }
    };

    return (
        <div className={`border h-auto shadow-lg rounded-md flex flex-col space-y-4 overflow-hidden pb-4 ${editMode ? 'p-8' : ''}`}>
            {editMode ? (
                <textarea
                    ref={inputRef}
                    defaultValue={url}
                    disabled={false}
                    rows={1}
                    className='resize-none bg-transparent h-fit overflow-hidden border outline-0 rounded-md p-1 focus:border-blue-300 focus:border-2 focus:bg-white hover:bg-gray-50' />
            ) : (
                <>
                    <div className='player-wrapper'>
                        <ReactPlayer
                            ref={videoRef}
                            url={url}
                            width='100%'
                            height='100%'
                            className='react-player'
                            controls={true}
                        />
                    </div>
                    <div className='px-20 flex space-x-5'>
                        <textarea
                            rows={1}
                            className='w-full px-2 py-1 resize-none border shadow-md rounded-md'
                            placeholder='Search for clip...'
                        />
                        <button
                            className='px-2 py-1 rounded-md bg-blue-400 text-white'
                        >
                            Search
                        </button>
                    </div>
                    <div className='px-20 flex space-x-5'>
                        <textarea
                            rows={1}
                            className='w-full px-2 py-1 resize-none border-b outline-0'
                            placeholder='Search for clip...'
                        />
                        <button
                            className='px-2 py-1 rounded-md bg-blue-400 text-white'
                        >
                            Search
                        </button>
                    </div>
                </>
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
