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

   signUpErrors: {email:"",password:"",userName:"",confirmPassword:""},
   setSignUpErrors: (data:ISignUpDataErrors) => {
    set((state:ISignUpStore) => ({
        signUpErrors:{...state.signUpErrors,...data}
    }))
   },
   clearSignUpErrors: () => {
    set(() => ({
        signUpErrors:{email:"",password:"",userName:"",confirmPassword:""}
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
        if(res.status === 201){
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
   }
}))