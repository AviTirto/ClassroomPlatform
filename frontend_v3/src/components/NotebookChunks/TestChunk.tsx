/**
 * v0 by Vercel.
 * @see https://v0.dev/t/cnQ7ly7tnci
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SVGProps } from "react"
import { JSX } from "react/jsx-runtime"

export default function Component() {
  return (
    <Card className="w-full max-w-2xl">
      <div className="grid gap-4">
        <div className="rounded-lg overflow-hidden">
          <img
            src="/placeholder.svg"
            alt="Video Thumbnail"
            width={800}
            height={450}
            className="w-full aspect-video object-cover"
          />
        </div>
        <div className="grid gap-2">
          <div>
            <h3 className="text-xl font-semibold">Introducing the Frontend Cloud</h3>
            <p className="text-muted-foreground">Vercel Ship Keynote: Unveiling the future of web development.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <ClockIcon className="w-4 h-4" />
              <span>1:23:45</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <FilePenIcon className="w-5 h-5" />
              <span className="sr-only">Edit video URL</span>
            </Button>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search timestamps" className="pl-8" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 px-2 py-1 rounded">
              <div className="flex items-center gap-1 text-muted-foreground">
                <ClockIcon className="w-4 h-4" />
                <span>00:12:34</span>
              </div>
              <div className="flex-1 line-clamp-1">
                Introducing the frontend cloud, where frontend developers build, test, and deploy high-quality web
                applications efficiently and quickly, all on Vercel.
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 px-2 py-1 rounded">
              <div className="flex items-center gap-1 text-muted-foreground">
                <ClockIcon className="w-4 h-4" />
                <span>00:34:56</span>
              </div>
              <div className="flex-1 line-clamp-1">
                Leveraging the power of the frontend cloud to create seamless user experiences.
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 px-2 py-1 rounded">
              <div className="flex items-center gap-1 text-muted-foreground">
                <ClockIcon className="w-4 h-4" />
                <span>00:56:78</span>
              </div>
              <div className="flex-1 line-clamp-1">
                Exploring the latest advancements in frontend development with the Vercel platform.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function ClockIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function FilePenIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}


function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}