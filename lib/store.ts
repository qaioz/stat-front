import { create } from "zustand"

interface StatData {
  statValue: string
  version: number
  fetchedFrom: "database" | "cache"
  ttlSeconds: number
}

interface StatStore {
  statData: StatData | null
  isLoading: boolean
  isSettingValue: boolean
  error: string | null
  newStatValue: string
  cacheCountdown: number | null
  setStatData: (data: StatData) => void
  setLoading: (loading: boolean) => void
  setSettingValue: (setting: boolean) => void
  setError: (error: string | null) => void
  setNewStatValue: (value: string) => void
  setCacheCountdown: (countdown: number | null) => void
  decrementCountdown: () => void
  clearError: () => void
}

export const useStatStore = create<StatStore>((set, get) => ({
  statData: null,
  isLoading: false,
  isSettingValue: false,
  error: null,
  newStatValue: "",
  cacheCountdown: null,
  setStatData: (data) => {
    set({ statData: data })
    // Start countdown if data is from cache
    if (data.fetchedFrom.toLocaleLowerCase() === "cache") {
      set({ cacheCountdown: data.ttlSeconds })
    } else {
      set({ cacheCountdown: null })
    }
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setSettingValue: (setting) => set({ isSettingValue: setting }),
  setError: (error) => set({ error }),
  setNewStatValue: (value) => set({ newStatValue: value }),
  setCacheCountdown: (countdown) => set({ cacheCountdown: countdown }),
  decrementCountdown: () => {
    const { cacheCountdown } = get()
    if (cacheCountdown !== null && cacheCountdown > 0) {
      set({ cacheCountdown: cacheCountdown - 1 })
    } else if (cacheCountdown === 0) {
      // set({ cacheCountdown: 0 })
    }
  },
  clearError: () => set({ error: null }),
}))
