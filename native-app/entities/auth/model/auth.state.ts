import AsyncStorage from '@react-native-async-storage/async-storage'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { atom } from 'jotai'
import { LoginRequest, AuthResponse } from './auth.interfaces'
import log from '../../../logger/log'
import { API } from '../api/api'
import axios, { AxiosError } from 'axios'

const storage = createJSONStorage<AuthState>(() => AsyncStorage)

export const authAtom = atomWithStorage<AuthState>('auth', {
  access_token: null,
  isLoading: false,
  error: null,
})

export const loginAtom = atom(
  (get) => get(authAtom),
  async (_get, set, { email, password }: LoginRequest) => {
    set(authAtom, {
      isLoading: true,
      access_token: null,
      error: null,
    })
    try {
      const { data } = await axios.post<AuthResponse>(API.login, {
        email,
        password,
      })
      set(authAtom, {
        isLoading: false,
        access_token: data.access_token,
        error: null,
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        set(authAtom, {
          isLoading: false,
          access_token: null,
          error: error.response?.data.message,
        })
      }
    }
  }
)

export interface AuthState {
  access_token: string | null
  isLoading: boolean
  error: string | null
}
