"use client"

import { StatDisplay } from "@/components/stat-display"
import { ActionButtons } from "@/components/action-buttons"
import { ErrorDisplay } from "@/components/error-display"
import { AboutDialog } from "@/components/about-dialog"
import { BarChart3 } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <AboutDialog />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Stat Demo
              </h1>
            </div>
            <p className="text-muted-foreground max-w-md">
              A demonstration of state management, caching, and optimistic locking with modern UI
            </p>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-center space-y-6 w-full">
            <ErrorDisplay />
            <StatDisplay />
            <ActionButtons />
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Built with Next.js, Zustand, and shadcn/ui</p>
          </div>
        </div>
      </div>
    </div>
  )
}
