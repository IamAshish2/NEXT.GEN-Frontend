import { create } from 'zustand'
import { ISignInData, ISignInDataError, ISignInStore } from './interface'
import { axios_auth } from '../../../global/config';
import { useGlobalStore } from '@/global/store';
import { ForgotPasswordStep } from '@/global/enums';

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
            if(error?.response?.data?.message){
                return {message:error?.response?.data?.message,severity:"error"}
            }
            return { message: "something went wrong", severity: "error" };
        }
    },
    // state for setting the state of user to isreseting 
    isResettingPassword: false,
    setIsResetttingPassword: (isResettingPassword:boolean) => {
        set({isResettingPassword:isResettingPassword})
    },

    // state to verify whether the email is verified
    isEmailVerified: false,
    setIsEmailVerified: (isVerified: boolean) => {
        set({isEmailVerified:isVerified})
    },

    // state to verigy the otp
    isOtpVerified : false,
    setIsOtpVerified :(isVerified: boolean) => {
        set({isOtpVerified:isVerified})
    },


        // current step
        currentStep: ForgotPasswordStep.DEFAULT,
        setCurrentStep : (step:ForgotPasswordStep)  => {
            set({currentStep:step})
        }
}));