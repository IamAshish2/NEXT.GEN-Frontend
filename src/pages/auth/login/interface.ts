import { ForgotPasswordStep } from "@/global/enums";
import { IResponse } from "@/global/interface";
import { AlertColor } from "@mui/material";

export type ISignInData = {
    email: string | FormDataEntryValue | null 
    userName: string;
    password: string | FormDataEntryValue | null
}

export type ISignInDataError = {
    message: string,
    severity: AlertColor  | undefined
} 

export interface ISignInStore {
    signInData : ISignInData;
    setSignInData : (data: ISignInData) => void;
    clearSignInData : () => void;

    signInDataError : ISignInDataError;
    setSignInDataError : (data: ISignInDataError) => void;
    clearSignInDataError : () => void;
    // when the user signs in to the application, the server sends back the message and severity of the message
    signIn : () => Promise<IResponse>;

    // for forgot password
    isResettingPassword: boolean,
    setIsResetttingPassword: (isResettingPassword:boolean) => void;

    isEmailVerified: boolean,
    setIsEmailVerified: (isVerified: boolean) => void;

    // state for finally changing the password 
    isOtpVerified: boolean,
    setIsOtpVerified:  (isVerified: boolean) => void;


    // current step
    currentStep: ForgotPasswordStep,
    setCurrentStep : (step:ForgotPasswordStep)  => void;

    

}