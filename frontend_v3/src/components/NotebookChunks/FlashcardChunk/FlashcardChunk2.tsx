// Styling Imports
import { SearchIcon } from "@/assets/Icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Type Definition Imports
import { EDIT_TYPES, FlashcardChunkProps } from "@/constants/ChunkTypes"

// Components Import
import { EditFlashcardChunk } from "./EditFlashcardChunk"
import { ChunkOptions } from "../ChunkOptions"
import { Flashcard } from "./Flashcard"

export const FlashcardChunk2: React.FC<FlashcardChunkProps> = ({ title, flashcards }) => {

    return (
        <Card className="w-full max-w-3xl">
            <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4">
                <CardTitle>{title}</CardTitle>
                <EditFlashcardChunk
                    flashcards={flashcards}
                >
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
                        {
                            flashcards.map(flashcard => {
                                return (
                                    <Flashcard flashcard={flashcard} />
                                )
                            })
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </CardContent>
        </Card>
    )
}
