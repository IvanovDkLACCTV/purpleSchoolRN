import { atom } from "jotai";
import {User} from "./user.model";

export const profileAtom = atom<UserState>({
    profile: {
        id: 0,
        name: 'John',
        surname: 'Doe',
        photo: ''
    },
    isLoading: false,
    error: null
});

export interface UserState {
    profile: User | null
    isLoading: boolean
    error: string | null
}