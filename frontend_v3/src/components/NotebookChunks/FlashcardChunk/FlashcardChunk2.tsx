// Styling Imports
import { SearchIcon } from "@/assets/Icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Type Definition Imports
import { FlashcardChunkProps } from "@/constants/ChunkTypes"

export const FlashcardChunk2: React.FC<FlashcardChunkProps> = ({ flashcards }) => {

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader className="items-start gap-4">
                <CardTitle>Flashcard Title</CardTitle>
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
            </CardHeader>
            <CardContent className="px-20">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem>
                            <Card className="p-2 py-10 text-center">
                                1
                            </Card>
                        </CarouselItem>
                        <CarouselItem>
                            <Card className="p-2 py-10 text-center">
                                2
                            </Card>
                        </CarouselItem>
                        <CarouselItem>
                            <Card className="p-2 py-10 text-center">
                                3
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
