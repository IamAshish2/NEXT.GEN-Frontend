import { IResponse } from "@/global/interface"
import { AlertColor } from "@mui/material"

export type ISignUpData = {
    userName: string | FormDataEntryValue | null,
    email:string | FormDataEntryValue | null,
    password: string | FormDataEntryValue | null,
    confirmPassword: string | FormDataEntryValue | null
}

export type ISignUpDataErrors = {
    message: string,
    severity: AlertColor  | undefined
}

export interface ISignUpStore {
    signUpData: ISignUpData,
    setSignUpData: (data:ISignUpData) => void,
    clearSignUpData: () => void,

    signUpErrors : ISignUpDataErrors
    setSignUpErrors : (errors:ISignUpDataErrors) => void,
    clearSignUpErrors: () => void,
    SignUp: () => Promise<IResponse>
}
