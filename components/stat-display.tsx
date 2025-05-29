"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStatStore } from "@/lib/store"
import { Database, Hash, Timer, Clock } from "lucide-react"
import { useEffect } from "react"

export function StatDisplay() {
  const { statData, cacheCountdown, decrementCountdown } = useStatStore()

  // Timer effect for countdown
  useEffect(() => {
    if (cacheCountdown === null || cacheCountdown <= 0) return

    const timer = setInterval(() => {
      decrementCountdown()
    }, 1000)

    return () => clearInterval(timer)
  }, [cacheCountdown, decrementCountdown])

  if (!statData) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-muted-foreground">No Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">Click "Get Stat" to fetch data</p>
        </CardContent>
      </Card>
    )
  }

  const isCached = statData.fetchedFrom.toLocaleLowerCase() === "cache" && cacheCountdown !== null && cacheCountdown > -1;
    
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Current Stat
          {isCached && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 animate-pulse">
              <Clock className="h-3 w-3 mr-1" />
              Cached
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Value:</span>
            <span className="font-mono text-lg">{statData.statValue}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <Hash className="h-3 w-3" />
              Version:
            </span>
            <Badge variant="secondary">{statData.version}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Source:</span>
            <Badge
              variant={statData.fetchedFrom === "cache" ? "default" : "outline"}
              className={statData.fetchedFrom === "cache" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
            >
              {statData.fetchedFrom}
            </Badge>
          </div>

          {isCached && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-1">
                <Timer className="h-3 w-3" />
                Cache expires in:
              </span>
              <div className="flex items-center gap-1">
                <Badge
                  variant="outline"
                  className={`${
                    cacheCountdown <= 10
                      ? "bg-red-100 text-red-800 border-red-200"
                      : cacheCountdown <= 30
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : "bg-green-100 text-green-800 border-green-200"
                  } font-mono`}
                >
                  {cacheCountdown}s
                </Badge>
              </div>
            </div>
          )}

          {statData.fetchedFrom === "cache" && !isCached && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-1">
                <Timer className="h-3 w-3" />
                Original TTL:
              </span>
              <span className="text-sm text-muted-foreground">{statData.ttlSeconds}s (expired)</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
