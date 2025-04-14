import { create } from "zustand";
import { IForgotPasswordStore } from "./interface";
import { axios_no_auth } from "@/global/config";

export const useForgotPasswordStore = create<IForgotPasswordStore>((set,get) => ({
    email: "",
    setEmail: (email:string) => {
        set({email:email })
    },
    clearData: () => {
        set({email:""})
    },
    forgotPassword: async () => {
        try {
            const res = await axios_no_auth.post(  `auth/forgot-password?email=${encodeURIComponent(get().email as string)}`);
            console.log(res);

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
}));