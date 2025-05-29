"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useStatStore } from "@/lib/store"
import { AlertCircle, X } from "lucide-react"

export function ErrorDisplay() {
  const { error, clearError } = useStatStore()

  if (!error) return null

  return (
    <Alert variant="destructive" className="w-full max-w-md">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{error}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-destructive-foreground hover:bg-destructive/20"
          onClick={clearError}
        >
          <X className="h-3 w-3" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
