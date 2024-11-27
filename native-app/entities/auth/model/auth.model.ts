import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage } from "jotai/utils";

const starage = createJSONStorage<AuthState>(() => AsyncStorage);

export interface AuthState {
    access_token: string | null
    isLoading: boolean
    error: string | null
}
