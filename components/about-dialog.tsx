"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Info } from "lucide-react"

export function AboutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 right-4">
          <Info className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            About Stat Demo
          </DialogTitle>
          <DialogDescription className="text-left space-y-3">
            <p>
              This application is running in <strong>development mode</strong> where the set and database fetch
              operations are deliberately simulated to take a long time.
            </p>
            <p>
              If you want to try concurrent get or updates, try opening <strong>two tabs</strong> and performing
              operations simultaneously to see the optimistic locking in action.
            </p>
            <p>The application demonstrates:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Caching vs database fetching</li>
              <li>Optimistic locking for concurrent updates</li>
              <li>TTL (Time To Live) for cached data</li>
              <li>Modern state management with Zustand</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
