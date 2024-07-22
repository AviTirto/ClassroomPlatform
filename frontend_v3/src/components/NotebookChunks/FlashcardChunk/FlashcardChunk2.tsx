// Styling Imports
import { SearchIcon } from "@/assets/Icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <FileIcon className="h-5 w-5" />
                                <span>Select Documents</span>
                                <ChevronDownIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Command>
                                <CommandInput placeholder="Type a command or search..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup heading="Suggestions">
                                        <CommandItem>Calendar</CommandItem>
                                        <CommandItem>Search Emoji</CommandItem>
                                        <CommandItem>Calculator</CommandItem>
                                    </CommandGroup>
                                    <CommandSeparator />
                                    <CommandGroup heading="Settings">
                                        <CommandItem>Profile</CommandItem>
                                        <CommandItem>Billing</CommandItem>
                                        <CommandItem>Settings</CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                            <Button>Select All</Button>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
        </Card >
    )
}

function FileIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
    )
}

function ChevronDownIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}
