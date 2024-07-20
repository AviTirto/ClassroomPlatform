import { z } from "zod"

export const lectSchema = z.object({
    new_title: z.string().min(2).max(50),
    new_description: z.string().min(2).max(50),
    new_url: z.string().url().min(2).max(50),
})

export type lectForm = z.infer<typeof lectSchema>