import { create } from 'zustand'
import { ISignInData, ISignInDataError, ISignInStore } from './interface'
import { axios_no_auth } from '../../../global/config';

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

    signIn: async () => {
        try {
            const res = await axios_no_auth.post('Auth/login',get().signInData);
            if(res.status === 200 && res.data.token){
                return {token: res?.data?.token};
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


}));