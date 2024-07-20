import { useState, useRef } from 'react';
import ChunkOptions from './ChunkOptions';
import ReactPlayer from "react-player";
import { CHUNK_TYPES } from '../metadata/ChunkTypes';
import { useNBDeleteChunks, useNBUpdateChunks } from '../services/NBChunksProvider';
import { useNewUpdatedAt } from '../services/NBTimestampProvider';
import './VideoChunk.css'
import { LectureAPI } from '../apis/LectureAPI';

export default function VideoChunk({ order, url, defaultEditMode }) {
    const [editMode, setEditMode] = useState(defaultEditMode);
    const inputRef = useRef(null);
    const videoRef = useRef(null);
    const updateChunk = useNBUpdateChunks();
    const newUpdatedAt = useNewUpdatedAt();
    const deleteChunk = useNBDeleteChunks();
    const [lectUrl, setLectUrl] = useState(url)
    const [loadingState, setLoadingState] = useState(false)
    const [clips, setClips] = useState([])
    const [inputQuery, setInputQuery] = useState("")
    const [notValidVideo, setNotValidVideo] = useState(false)

    const handleSearch = async () => {
        await setLoadingState(true)
        if (inputQuery) {
            var newClips = await LectureAPI.queryLecture(inputQuery)
            newClips = [...new Set(newClips)]
            newClips.sort((a, b) => { return a.seconds - b.seconds})
            await setClips(newClips)
        }
        setLoadingState(false)
    }

    async function handleUpdate() {
        if (lectUrl === inputRef.current.value) {
            return;
        }
        const newUrl = inputRef.current.value;
        await LectureAPI.cleanLecture(lectUrl);
        setLoadingState(true);
        setLectUrl(newUrl);

        const updatedChunk = {
            type: CHUNK_TYPES.VIDEO,
            'order': order,
            'url': inputRef.current.value,
        }

        updateChunk(updatedChunk);
        setEditMode(!editMode);
        newUpdatedAt();
        setClips([])
        setInputQuery("")
        const title = await LectureAPI.postLecture(newUrl);
        setLoadingState(false)
        if (title == null){
            setNotValidVideo(true)
        }else {
            setNotValidVideo(false)
        }
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
                            className='w-full px-2 py-1 resize-none border shadow-md rounded-md outline-0 hover:shadow-xl hover:bg-gray-50 duration-300'
                            placeholder='Search for clip...'
                            value={inputQuery}
                            onChange={e => setInputQuery(e.target.value)}
                        />
                        {
                            loadingState ?
                                <div className='bg-blue-400 rounded-md px-5 items-center justify-center flex'>
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                </div>
                                :
                                notValidVideo ?
                                    <p>No Valid Subtitles</p>
                                    :
                                    <button
                                        className='px-2 py-1 rounded-md bg-blue-400 text-white hover:font-bold hover:px-3 duration-300'
                                        onClick={handleSearch}
                                    >
                                        Search
                                    </button>
                        }
                    </div>
                    {
                        clips && clips.length > 0 ?
                            loadingState ? <></> :
                                <div
                                    className='w-full px-20 flex items-center justify-center'
                                >
                                    {
                                    clips.map(clip => {
                                        return (
                                            <button
                                                key={clip.label}
                                                onClick={() => setTimeStamp(clip.seconds)}
                                                className='border-b px-4 hover:border-b-2 hover:border-blue-300 hover:font-bold hover:text-blue-300 duration-300'
                                            >
                                                {clip.label}
                                            </button>
                                        )
                                    })}
                                </div>
                            :
                            <></>
                    }
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
