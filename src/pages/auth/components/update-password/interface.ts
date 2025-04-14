import { IResponse } from "@/global/interface";

export interface IUpdatePasswordData {
    password: string;
    confirmPassword: string;
}


export interface IPayloadData {
    email: string,
    newPassword: string;
}

export interface IUpdatePasswordStore {
    data: IUpdatePasswordData,
    setData: (data:IUpdatePasswordData) => void;
    clearUpdatePasswordStoreData: () => void;
    
    // manage the loading state
    loading: boolean;
    setLoading: (status: boolean) => void;

    // manage the payload data 
    payloadData: IPayloadData;
    updatePassword: (data:IPayloadData) => Promise<IResponse>
}