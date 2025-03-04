export type ISignUpData = {
    userName: string | FormDataEntryValue | null,
    email:string | FormDataEntryValue | null,
    password: string | FormDataEntryValue | null,
    confirmPassword: string | FormDataEntryValue | null
}

export type ISignUpDataErrors = {
    userName: string,
    email:string 
    password: string 
    confirmPassword: string 
}

export interface ISignUpStore {
    signUpData: ISignUpData,
    setSignUpData: (data:ISignUpData) => void,
    clearSignUpData: () => void,

    signUpErrors : ISignUpDataErrors
    setSignUpErrors : (errors:ISignUpDataErrors) => void,
    clearSignUpErrors: () => void,
    SignUp: () => Promise<boolean>
}
