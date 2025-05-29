import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 30000,
})

export interface StatResponse {
  statValue: string
  version: number
  fetchedFrom: "database" | "cache"
  ttlSeconds: number
}

export const statApi = {
  getStat: async (): Promise<StatResponse> => {
    const response = await api.get("/get")
    return response.data
  },

  setStat: async (statValue: string): Promise<void> => {
    const response = await api.put("/set", { "value": statValue })

    if (response.status === 409) {
      throw new Error(response.data?.message || "Concurrent update detected. Please try again.")
    }

    if (response.status !== 204) {
      throw new Error("Failed to update stat value")
    }
  },
}
