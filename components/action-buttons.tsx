"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStatStore } from "@/lib/store"
import { statApi } from "@/lib/api"
import { Download, Upload, Loader2 } from "lucide-react"

export function ActionButtons() {
  const {
    isLoading,
    isSettingValue,
    newStatValue,
    setStatData,
    setLoading,
    setSettingValue,
    setError,
    setNewStatValue,
    clearError,
  } = useStatStore()

  const handleGetStat = async () => {
    try {
      clearError()
      setLoading(true)
      const data = await statApi.getStat()
      setStatData(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch stat")
    } finally {
      setLoading(false)
    }
  }

  const handleSetStat = async () => {
    if (!newStatValue.trim()) {
      setError("Please enter a value to set")
      return
    }
    console.log(newStatValue.trim());
    

    try {
      clearError()
      setSettingValue(true)
      await statApi.setStat(newStatValue.trim())
      setNewStatValue("")
      // // Automatically fetch updated data
      await handleGetStat()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to set stat")
    } finally {
      setSettingValue(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={handleGetStat} disabled={isLoading || isSettingValue} className="flex-1" variant="outline">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Get Stat
              </>
            )}
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="statValue">New Stat Value</Label>
          <div className="flex gap-2">
            <Input
              id="statValue"
              placeholder="Enter new value..."
              value={newStatValue}
              onChange={(e) => setNewStatValue(e.target.value)}
              disabled={isLoading || isSettingValue}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading && !isSettingValue) {
                  handleSetStat()
                }
              }}
            />
            <Button onClick={handleSetStat} disabled={isLoading || isSettingValue || !newStatValue.trim()} size="icon">
              {isSettingValue ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
