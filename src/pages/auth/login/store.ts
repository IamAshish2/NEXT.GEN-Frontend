import { create } from 'zustand'
import { ISignInData, ISignInDataError, ISignInStore } from './interface'
import { axios_auth } from '../../../global/config';

export const useSignInStore = create<ISignInStore>((set,get) => ({
    signInData: {email: "", password: "", userName: ""},

    setSignInData: (data:ISignInData) => {
        set((state: ISignInStore) => ({
            signInData: {...state.signInData,...data}
        }));
    },
    clearSignInData: () => set({signInData: {email: "", password: "",userName:""}}),

    signInDataError: {email: "",password: "", userName : ""},
    setSignInDataError:(data:ISignInDataError) => {
        set((state: ISignInStore) => ({
            signInDataError: {...state.signInDataError, ... data}
        }))
    },
    clearSignInDataError: () => set({signInDataError: {email: "",password:"",userName:""}}),

    // handle the errors properly
    signIn: async () => {
        try {
            const res = await axios_auth.post('Auth/login',get().signInData);
            return res;  
        } catch (error) {
            return undefined
        }
    }
}));