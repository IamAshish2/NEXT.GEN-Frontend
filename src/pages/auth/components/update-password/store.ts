import { create } from "zustand";
import { IPayloadData, IUpdatePasswordData, IUpdatePasswordStore } from "./interface";
import { axios_no_auth } from "@/global/config";

const defaultdata = {
    password: "",
    confirmPassword: ""
}

const defaultPayloadData = {
    email: "",
    newPassword: ""
}

export const useUpdatePasswordStore = create<IUpdatePasswordStore>((set) => ({
    data: defaultdata,
    setData: (data:IUpdatePasswordData) => {
        set((state:IUpdatePasswordStore) => ({
            data: {...state.data,...data}
        }))
    },
    clearUpdatePasswordStoreData: () => {
        set({data:defaultdata})
    },
    
    // manage the loading state
    loading: false,
    setLoading: (status: boolean) => {
        set({loading:status})
    },

    payloadData: defaultPayloadData,

    updatePassword: async (data:IPayloadData) => {
        try{

            const res = await axios_no_auth.patch(`auth/reset-password`,data);
            console.log(res);
            
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
}
))