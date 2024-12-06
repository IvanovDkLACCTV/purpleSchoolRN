import AsyncStorage from "@react-native-async-storage/async-storage"
import { atomWithStorage, createJSONStorage } from "jotai/utils"
import { atom } from "jotai"

const starage = createJSONStorage<AuthState>(() => AsyncStorage)

export const authAtom = atomWithStorage<AuthState>("auth", {
  access_token: null,
  isLoading: false,
  error: null,
})

export const loginAtom = atom<string | null>(null)

export interface AuthState {
  access_token: string | null
  isLoading: boolean
  error: string | null
}
