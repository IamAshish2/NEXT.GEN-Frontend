import { AxiosResponse } from "axios";

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
    // when the user signs in to the application, the server sends back the message and severity of the message
    // signIn : () => Promise<IResponse>;
    signIn : () => Promise<void | AxiosResponse>;
}