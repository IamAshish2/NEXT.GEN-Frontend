import { create } from 'zustand'
import { ISignInData, ISignInDataError, ISignInStore } from './interface'
import { axios_auth } from '../../../global/config';
import { useGlobalStore } from '@/global/store';

export const useSignInStore = create<ISignInStore>((set,get) => ({
    signInData: {email: "", password: "", userName: ""},

    setSignInData: (data:ISignInData) => {
        set((state: ISignInStore) => ({
            signInData: {...state.signInData,...data}
        }));
    },
    clearSignInData: () => set({signInData: {email: "", password: "",userName:""}}),

    signInDataError: {message:"",severity: undefined},
    setSignInDataError:(data:ISignInDataError) => {
        set((state: ISignInStore) => ({
            signInDataError: {...state.signInDataError, ... data}
        }))
    },
    clearSignInDataError: () => set({signInDataError: {message:"",severity: undefined}}),

    // handle the errors properly
    // IResponse
    signIn: async () => {
        try {
            const res = await axios_auth.post('Auth/login',get().signInData);
             
            if(res && res?.status >= 200 && res?.status <= 300){
                const data = res?.data;
                const user = useGlobalStore.getState().user;
    
                useGlobalStore.getState().setUser({
                    ...user,
                    userName:data?.userName
                })
            }

            return res?.status >= 200 && res?.status <= 300
            ? { message: res?.data?.message, severity: "success" }
            : { message: res?.data?.message, severity: "error" };
        } 
        catch (error: any) {
            console.log(error);

            if(error?.response?.data?.message){
                return {message:error?.response?.data?.message,severity:"error"}
            }
            return { message: "something went wrong", severity: "error" };
        }
    }
}));