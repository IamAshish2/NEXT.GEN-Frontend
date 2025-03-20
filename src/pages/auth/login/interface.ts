import { IUserData } from "@/global/interface";

export type ISignInData = {
    email: string | FormDataEntryValue | null 
    userName: string;
    password: string | FormDataEntryValue | null
}

export type ISignInDataError = {
    email: string;
    userName: string;
    password: string;
}

export interface ISignInStore {
    signInData : ISignInData;
    setSignInData : (data: ISignInData) => void;
    clearSignInData : () => void;

    signInDataError : ISignInDataError;
    setSignInDataError : (data: ISignInDataError) => void;
    clearSignInDataError : () => void;
    signIn : () => Promise<false | IUserData>
}