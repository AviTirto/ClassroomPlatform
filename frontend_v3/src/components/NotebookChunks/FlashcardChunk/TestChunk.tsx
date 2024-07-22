/**
 * v0 by Vercel.
 * @see https://v0.dev/t/gDRmar6emyZ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function Component() {
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <FileIcon className="h-5 w-5" />
            <span>Select Documents</span>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[400px] p-4">
          <div className="flex items-center gap-2 mb-4">
            <Input type="search" placeholder="Search documents..." className="flex-1" />
            <Button variant="ghost" size="icon">
              <SearchIcon className="h-5 w-5" />
            </Button>
          </div>
          <div className="max-h-[300px] overflow-auto">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="select-all" />
                  <Label htmlFor="select-all" className="font-medium">
                    Select All
                  </Label>
                </div>
                <Button variant="ghost" size="icon">
                  <TrashIcon className="h-5 w-5 text-destructive" />
                </Button>
              </div>
              <div className="border-t pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="doc-1" />
                    <Label htmlFor="doc-1" className="font-medium">
                      Annual Report 2023
                    </Label>
                  </div>
                  <Button variant="ghost" size="icon">
                    <TrashIcon className="h-5 w-5 text-destructive" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="doc-2" />
                    <Label htmlFor="doc-2" className="font-medium">
                      Marketing Presentation
                    </Label>
                  </div>
                  <Button variant="ghost" size="icon">
                    <TrashIcon className="h-5 w-5 text-destructive" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="doc-3" />
                    <Label htmlFor="doc-3" className="font-medium">
                      Q4 Financial Report
                    </Label>
                  </div>
                  <Button variant="ghost" size="icon">
                    <TrashIcon className="h-5 w-5 text-destructive" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="doc-4" />
                    <Label htmlFor="doc-4" className="font-medium">
                      Employee Handbook
                    </Label>
                  </div>
                  <Button variant="ghost" size="icon">
                    <TrashIcon className="h-5 w-5 text-destructive" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="doc-5" />
                    <Label htmlFor="doc-5" className="font-medium">
                      Project Plan 2024
                    </Label>
                  </div>
                  <Button variant="ghost" size="icon">
                    <TrashIcon className="h-5 w-5 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
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


function SearchIcon(props) {
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


function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}


function XIcon(props) {
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