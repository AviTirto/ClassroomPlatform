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
import { Checkbox } from "@/components/ui/checkbox"

// Type Definition Imports
import { EDIT_TYPES, FlashcardChunkProps } from "@/constants/ChunkTypes"

// Components Import
import { EditFlashcardChunk } from "./EditFlashcardChunk"
import { ChunkOptions } from "../ChunkOptions"
import { Flashcard } from "./Flashcard"
import { Label } from "@/components/ui/label"

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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <FileIcon className="h-4 w-4" />
                                <span>Select Documents</span>
                                <ChevronDownIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <div className="border-b">
                                <Command>
                                    <CommandInput placeholder="Search for document..." />
                                    <CommandList>
                                        <CommandEmpty>No results found.</CommandEmpty>
                                        <CommandGroup heading="Files">
                                            <CommandItem className="flex gap-2">
                                                <Checkbox id="doc1" />
                                                <Label htmlFor="doc1" className="font-normal text-sm">
                                                    Document 1
                                                </Label>
                                            </CommandItem>
                                            <CommandItem className="flex gap-2">
                                                <Checkbox id="doc2" />
                                                <Label htmlFor="doc2" className="font-normal text-sm">
                                                    Document 2
                                                </Label>
                                            </CommandItem>
                                            <CommandItem className="flex gap-2">
                                                <Checkbox id="doc3" />
                                                <Label htmlFor="doc3" className="font-normal text-sm">
                                                    Document 3
                                                </Label>
                                            </CommandItem>
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </div>
                            <div className="m-1">
                                <div className="flex items-center gap-2 p-2 hover:bg-accent rounded-sm">
                                    <Checkbox id="select-all" />
                                    <Label htmlFor="select-all" className="font-medium">
                                        Select All
                                    </Label>
                                </div>
                                <Button variant='ghost' className="w-full h-fit justify-start flex gap-2 px-2 py-1 rounded-sm">
                                    <AddFileIcon className="w-4 h-4" />
                                    Upload File
                                </Button>
                            </div>
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
            width="15"
            height="15"
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

function AddFileIcon(props) {
    return (
        <svg
            {...props}
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V4.70711L9.29289 2H3.5ZM2 2.5C2 1.67157 2.67157 1 3.5 1H9.5C9.63261 1 9.75979 1.05268 9.85355 1.14645L12.7803 4.07322C12.921 4.21388 13 4.40464 13 4.60355V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5ZM4.75 7.5C4.75 7.22386 4.97386 7 5.25 7H7V5.25C7 4.97386 7.22386 4.75 7.5 4.75C7.77614 4.75 8 4.97386 8 5.25V7H9.75C10.0261 7 10.25 7.22386 10.25 7.5C10.25 7.77614 10.0261 8 9.75 8H8V9.75C8 10.0261 7.77614 10.25 7.5 10.25C7.22386 10.25 7 10.0261 7 9.75V8H5.25C4.97386 8 4.75 7.77614 4.75 7.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
            </path>
        </svg>
    )
}
