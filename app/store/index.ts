import { create } from "zustand"

export const useUser = create<{
  appUserId: string | null
  privateKey: string | null
  updateUserId: (userId: string) => void
  generatePrivateKey: () => void
}>((set) => ({
  appUserId: null as string | null,
  privateKey: null,
  updateUserId: (userId: string) => set({ appUserId: userId }),
  generatePrivateKey: () => {
    const array = new Uint8Array(64)
    window.crypto.getRandomValues(array)
    set({
      privateKey: Array.from(array)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""),
    })
  },
}))
