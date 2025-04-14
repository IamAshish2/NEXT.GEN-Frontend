import { IResponse } from "@/global/interface";

export interface IForgotPasswordStore {
    email: string | FormDataEntryValue;
    setEmail: (email:string) => void;
    forgotPassword:  () => Promise<IResponse>;
    clearData: () => void,
}

export interface IForgotOptModalProps {
    onClose: () => void
}