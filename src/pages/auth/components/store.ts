import { create } from "zustand"
import { IOtpModalStore, IOtpVerifyRequestData } from "./interface";
import { axios_auth } from "@/global/config";

export const useOtpStore = create<IOtpModalStore>((set) => ({
    data: {email:"",code:""},

    setData: (data:IOtpVerifyRequestData) => {
        set((state:IOtpModalStore) => ({
            data:{...state.data,...data}
        }))
    },

    verifyOtp: async (data:IOtpVerifyRequestData) => {
        try {
            const res = await axios_auth.post('Otp/verify-otp',data);
        
            return res?.status >= 200 && res?.status <= 300
            ? { message: res?.data?.message, severity: "success" }
            : { message: res?.data?.message, severity: "error" };

        } catch (error: any) {
         if(error?.response?.data?.message){
            return {message:error?.response?.data?.message,severity:"error"}
        }
        return { message: "something went wrong", severity: "error" };
    }
    },

    clearData: () => {
        set({data:{email:"",code:""}})
    }
}));