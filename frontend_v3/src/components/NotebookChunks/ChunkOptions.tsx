// Styling Imports
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChunkOptionsProps } from "@/constants/ChunkTypes";
import { DialogTrigger } from "@/components/ui/dialog"
import { SheetTrigger } from "../ui/sheet";

// Icon Imports
import { FilePenIcon, TrashIcon } from "@/assets/Icons";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

// Constants Imports
import { EDIT_TYPES } from "@/constants/ChunkTypes";

export const ChunkOptions: React.FC<ChunkOptionsProps> = ({ onEditClick, onDeleteClick, editType }: ChunkOptionsProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="focus-visible:ring-offset-0 focus-visible:ring-0">
                    <DotsHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={onEditClick}>
                    {editType === EDIT_TYPES.dialog ?
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-fit">
                                <FilePenIcon className="w-4 h-4 mr-2" />
                                Edit Video
                            </Button>
                        </DialogTrigger>
                        : editType === EDIT_TYPES.sheet ?
                            <SheetTrigger>
                                <Button variant="ghost" size="sm" className="p-0 h-fit">
                                    <FilePenIcon className="w-4 h-4 mr-2" />
                                    Edit Video
                                </Button>
                            </SheetTrigger>
                            :
                            <>
                                <FilePenIcon className="w-4 h-4 mr-2" />
                                Edit Video
                            </>
                    }

                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDeleteClick} className="text-red-600">
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Delete Video
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
