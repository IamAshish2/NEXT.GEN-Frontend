import { create } from "zustand";
import { ISignUpData, ISignUpDataErrors, ISignUpStore } from "./interface";
import { axios_no_auth } from "../../../global/config";

export const useSignUpStore = create<ISignUpStore>((set,get) => ({
    signUpData: {email:"",password:"",userName:"",confirmPassword:""},
 
    setSignUpData: (data:ISignUpData) => {
        set((state: ISignUpStore) => ({
            signUpData: {...state.signUpData,...data}
        }))
    },
   clearSignUpData: () => {
    set(() => ({
        signUpData: {email:"",password:"",userName:"",confirmPassword:""}
    }))
   },

   signUpErrors:  {message:"",severity: undefined},
   setSignUpErrors: (data:ISignUpDataErrors) => {
    set((state:ISignUpStore) => ({
        signUpErrors:{...state.signUpErrors,...data}
    }))
   },
   clearSignUpErrors: () => {
    set(() => ({
        signUpErrors: {message:"",severity: undefined},
    }))
   },
   SignUp: async () => {
    const signUpData = {
        "Email" : get().signUpData.email,
        "Password": get().signUpData.password,
        "UserName": get().signUpData.userName
    }
    
    try {
        const res = await axios_no_auth.post('User/create-user',signUpData);
        return res?.status >= 200 && res?.status <= 300
            ? { message: res?.data?.message, severity: "success" }
            : { message: res?.data?.message, severity: "error" };
    } catch (error:any) {
        if(error?.response?.data?.message){
            return {message:error?.response?.data?.message,severity:"error"}
        }
        return { message: "something went wrong", severity: "error" };
    }
   }
}))