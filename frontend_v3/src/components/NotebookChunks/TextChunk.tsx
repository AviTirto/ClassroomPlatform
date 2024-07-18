import { TextChunkProps } from "@/constants/ChunkTypes"
"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export const TextChunk: React.FC<TextChunkProps> = ({ order, content, defaultEditMode }) => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Store Name</CardTitle>
                    <CardDescription>
                        Used to identify your store in the marketplace.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <Input placeholder="Store Name" />
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
            <>
                {order}
                {content}
                {defaultEditMode}
            </>
        </>
    )
}
