import { create } from "zustand";
import { IOtpData, IVerifyOtpStore } from "./interface";
import { axios_no_auth } from "@/global/config";

export const useVerifyOtpStore = create<IVerifyOtpStore>((set, get) => ({
    data: {
        email: "",
        code: "",
    },

    setData: (data: IOtpData) =>
        set(() => ({
            data,
        })),

    verifyOtp: async (data:IOtpData) => {
        try {
            const res = await axios_no_auth.post(`auth/validate-forgot-password-otp`,data);
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
    },

    clearData: () =>
        set({
            data: {
                email: "",
                code: "",
            },
        }),
}));
