import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FilePenIcon, TrashIcon } from "@/assets/Icons";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ChunkOptionsProps } from "@/constants/ChunkTypes";
import { DialogTrigger } from "@/components/ui/dialog"

export const ChunkOptions: React.FC<ChunkOptionsProps> = ({ onEditClick, onDeleteClick, isDialog }: ChunkOptionsProps) => {
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
                    {isDialog ?
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-fit">
                                <FilePenIcon className="w-4 h-4 mr-2" />
                                Edit Video
                            </Button>
                        </DialogTrigger>
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
