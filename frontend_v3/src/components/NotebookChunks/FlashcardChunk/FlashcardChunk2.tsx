// Styling Imports
import { SearchIcon } from "@/assets/Icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

// Type Definition Imports
import { EDIT_TYPES, FlashcardChunkProps } from "@/constants/ChunkTypes"

// Components Import
import EditFlashcardChunk from "./EditFlashcardChunk"
import { ChunkOptions } from "../ChunkOptions"

export const FlashcardChunk2: React.FC<FlashcardChunkProps> = ({ flashcards }) => {

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4">
                <CardTitle>Flashcard Title</CardTitle>
                <EditFlashcardChunk>
                    <ChunkOptions
                        onEditClick={() => { }}
                        onDeleteClick={() => { }}
                        editType={EDIT_TYPES.sheet}
                    />
                </EditFlashcardChunk>
            </CardHeader>
            <CardContent className="px-20">
                <div className="flex items-center mb-8">
                    <Input
                        placeholder="Search flashcards..."
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 mr-4"
                    />
                    <Select
                    // value={selectedFile}
                    // onValueChange={handleFileSelect}
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select file" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="file1.json">File 1</SelectItem>
                            <SelectItem value="file2.json">File 2</SelectItem>
                            <SelectItem value="file3.json">File 3</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        // onClick={handleSearch}
                        className="ml-4"
                        variant="ghost"
                    >
                        <SearchIcon className="w-5 h-5" />
                    </Button>

                </div>
                <Carousel>
                    <CarouselContent>
                        <CarouselItem>
                            <Card className="px-10 py-10 text-center flex flex-col space-y-2">
                                <h2 className="text-lg font-bold">Question 1</h2>
                                <Button variant="outline" className="w-full px-3 h-fit">
                                    <textarea
                                        className="resize-none w-full bg-inherit"
                                        disabled={true}
                                        value="option 1"
                                        rows={2}
                                    />
                                </Button>
                                <Button variant="outline" className="w-full px-3 h-fit">
                                    <textarea
                                        className="resize-none w-full bg-inherit"
                                        disabled={true}
                                        value="option 1"
                                        rows={2}
                                    />
                                </Button>
                                <Button variant="outline" className="w-full px-3 h-fit">
                                    <textarea
                                        className="resize-none w-full bg-inherit"
                                        disabled={true}
                                        value="option 3"
                                        rows={2}
                                    />
                                </Button>
                                <Button variant="outline" className="w-full px-3 h-fit">
                                    <textarea
                                        className="resize-none w-full bg-inherit"
                                        disabled={true}
                                        value="option 4"
                                        rows={2}
                                    />
                                </Button>
                                <Drawer>
                                    <DrawerTrigger>
                                        <Button className="place-self-start">
                                            Explanation
                                        </Button>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader>
                                            <DrawerTitle>Explanation</DrawerTitle>
                                            <DrawerDescription>This is the reason why this is correct or wrong.</DrawerDescription>
                                        </DrawerHeader>
                                        <DrawerFooter>
                                            <DrawerClose>
                                                <Button variant="destructive">Close</Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                            </Card>
                        </CarouselItem>
                        <CarouselItem>
                            <Card className="px-10 py-10 text-center flex flex-col space-y-2">
                                <h2 className="text-lg font-bold">Question 2</h2>
                                <Button variant="outline" className="w-full px-3 h-fit">
                                    <textarea
                                        className="resize-none w-full bg-inherit"
                                        disabled={true}
                                        value="option 1"
                                        rows={2}
                                    />
                                </Button>
                                <Button variant="outline" className="w-full px-3 h-fit">
                                    <textarea
                                        className="resize-none w-full bg-inherit"
                                        disabled={true}
                                        value="option 1"
                                        rows={2}
                                    />
                                </Button>
                                <Button variant="outline" className="w-full px-3 h-fit">
                                    <textarea
                                        className="resize-none w-full bg-inherit"
                                        disabled={true}
                                        value="option 3"
                                        rows={2}
                                    />
                                </Button>
                                <Button variant="outline" className="w-full px-3 h-fit">
                                    <textarea
                                        className="resize-none w-full bg-inherit"
                                        disabled={true}
                                        value="option 4"
                                        rows={2}
                                    />
                                </Button>
                            </Card>
                        </CarouselItem>
                        <CarouselItem>
                            <Card className="px-10 py-10 text-center flex flex-col space-y-2">
                                <h2 className="text-lg font-bold">Question 3</h2>
                                <Button variant="outline" className="w-full px-3 h-fit">
                                    <textarea
                                        className="resize-none w-full bg-inherit"
                                        disabled={true}
                                        value="option 1"
                                        rows={2}
                                    />
                                </Button>
                                <Button variant="outline" className="w-full px-3 h-fit">
                                    <textarea
                                        className="resize-none w-full bg-inherit"
                                        disabled={true}
                                        value="option 1"
                                        rows={2}
                                    />
                                </Button>
                                <Button variant="outline" className="w-full px-3 h-fit">
                                    <textarea
                                        className="resize-none w-full bg-inherit"
                                        disabled={true}
                                        value="option 3"
                                        rows={2}
                                    />
                                </Button>
                                <Button variant="outline" className="w-full px-3 h-fit">
                                    <textarea
                                        className="resize-none w-full bg-inherit"
                                        disabled={true}
                                        value="option 4"
                                        rows={2}
                                    />
                                </Button>
                            </Card>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </CardContent>
        </Card>
    )
}
