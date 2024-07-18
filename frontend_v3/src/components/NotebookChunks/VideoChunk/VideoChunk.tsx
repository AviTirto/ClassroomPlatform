/**
 * Original concept generated by v0 by Vercel.
 * @see https://v0.dev/t/FiptNXNSTOU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

// Styling Imports
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, ClockIcon } from "@/assets/Icons"

// React Functionality Imports
import { useState, useRef } from 'react'

// Context Management Imports
import { useNBDeleteChunks, useNBUpdateChunks } from "@/services/NBChunksProvider"
import { useNewUpdatedAt } from "@/services/NBTimestampsProvider"

// Type Definition Imports
import { VideoChunkProps } from "@/constants/ChunkTypes"
import { ChunkOptions } from "../ChunkOptions"

// API Imports
import { LectureAPI } from "@/apis/LectureAPI"
import { EditVideoChunk } from "./EditVideoChunk"
import { Label } from "@/components/ui/label"


export const VideoChunk: React.FC<VideoChunkProps> = ({ order, url, defaultEditMode }) => {
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

    // const handleSearch = async () => {
    //     await setLoadingState(true)
    //     if (inputQuery) {
    //         const newClips = await LectureAPI.queryLecture(inputQuery)
    //         newClips.sort((a, b) => { return a.seconds - b.seconds})
    //         await setClips(newClips)
    //     }
    //     setLoadingState(false)
    // }

    // async function handleUpdate() {
    //     if (lectUrl === inputRef.current.value) {
    //         return;
    //     }
    //     const newUrl = inputRef.current.value;
    //     await LectureAPI.cleanLecture(lectUrl);
    //     setLoadingState(true);
    //     setLectUrl(newUrl);

    //     const updatedChunk = {
    //         type: CHUNK_TYPES.VIDEO,
    //         'order': order,
    //         'url': inputRef.current.value,
    //     }

    //     updateChunk(updatedChunk);
    //     setEditMode(!editMode);
    //     newUpdatedAt();
    //     setClips([])
    //     setInputQuery("")
    //     const title = await LectureAPI.postLecture(newUrl);
    //     setLoadingState(false)
    // }

    // const handleDelete = () => {
    //     deleteChunk(order);
    // }

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleDeleteClick = () => {

    };

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4">
                <div className="space-y-2">
                    <CardTitle>Title</CardTitle>
                    <CardDescription>A step-by-step guide on building a React application from scratch.</CardDescription>
                </div>
                <EditVideoChunk
                    title={"Title"}
                    description={"description"}
                    url = { lectUrl }
                    >
                    <ChunkOptions
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
                        isDialog = { true }
                    />
                </EditVideoChunk>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    <div className="relative rounded-lg overflow-hidden aspect-video">
                        <video
                            className="w-full h-full object-cover"
                            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            controls
                        />
                    </div>
                    <div className="grid gap-4">
                        <div className="flex items-center gap-2">
                            <Input type="search" placeholder="Search for timestamps" className="flex-1 focus-visible:ring-offset-0 focus-visible:ring-0 hover:bg-gray-50 duration-500" />
                            <Button variant="ghost">
                                <SearchIcon className="w-5 h-5" />
                            </Button>
                        </div>
                        {/* <div className="grid gap-2">
                            <div className="flex items-center gap-2 bg-muted rounded-md p-2 cursor-pointer hover:bg-muted-foreground/10">
                                <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-md text-sm text-white">
                                    <ClockIcon className="w-4 h-4" />
                                    <span>0:45</span>
                                </div>
                                <div className="flex-1 line-clamp-1">Setting up the development environment</div>
                            </div>
                            <div className="flex items-center gap-2 bg-muted rounded-md p-2 cursor-pointer hover:bg-muted-foreground/10">
                                <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-md text-sm text-white">
                                    <ClockIcon className="w-4 h-4" />
                                    <span>2:34</span>
                                </div>
                                <div className="flex-1 line-clamp-1">Creating the first React component</div>
                            </div>
                            <div className="flex items-center gap-2 bg-muted rounded-md p-2 cursor-pointer hover:bg-muted-foreground/10">
                                <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-md text-sm text-white">
                                    <ClockIcon className="w-4 h-4" />
                                    <span>5:12</span>
                                </div>
                                <div className="flex-1 line-clamp-1">Styling the application with Tailwind CSS</div>
                            </div>
                        </div> */}
                        <div className="grid gap-2">
                            <div className="grid">
                                <button className="flex justify-start items-center gap-2 text-sm cursor-pointer px-2 py-1 border-l-2 hover:border-l-4 hover:py-2 duration-500 hover:font-bold">
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <ClockIcon className="w-4 h-4" />
                                        <span>00:12:34</span>
                                    </div>
                                    <div className="line-clamp-1">
                                        Introducing the frontend cloud, where frontend developers build
                                        {/* , test, and deploy high-quality web applications efficiently and quickly, all on Vercel. */}
                                    </div>
                                </button>
                                <button className="flex gap-2 text-sm cursor-pointer px-2 py-1 border-l-2 hover:border-l-4 hover:py-2 duration-500 hover:font-bold">
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <ClockIcon className="w-4 h-4" />
                                        <span>00:34:56</span>
                                    </div>
                                    <div className="line-clamp-1">
                                        Leveraging the power of the frontend cloud to create seamless user experiences.
                                    </div>
                                </button>
                                <button className="flex gap-2 text-sm cursor-pointer px-2 py-1 border-l-2 hover:border-l-4 hover:py-2 duration-500 hover:font-bold">
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <ClockIcon className="w-4 h-4" />
                                        <span>00:56:78</span>
                                    </div>
                                    <div className="line-clamp-1">
                                        Exploring the latest advancements in frontend development with the Vercel platform.
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}