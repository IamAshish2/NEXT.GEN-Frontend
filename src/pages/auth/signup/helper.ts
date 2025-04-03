import { AlertColor } from "@mui/material"
import { IToasterData } from "../../../global/components/toaster/interface"
import { ISignUpData, ISignUpDataErrors } from "./interface"
import { IResponse } from "@/global/interface"

export class SignUpHelper{
    validateData(data:ISignUpData){
        const error:ISignUpDataErrors = {} as ISignUpDataErrors
               if(!data.email) {
                   return {message:"The email cannot be empty!",severity:"error" as AlertColor}
               }
       
               if(!data.userName) {
                   return {message:"The username cannot be empty!",severity:"error" as AlertColor}
               }
       
               if(!data.password)  return {message:"Password is required",severity:"error" as AlertColor}

               if(data.password !== data.confirmPassword)  return {message:"Password do not match",severity:"error" as AlertColor}
               return error;
    }

    signUp = async(
        signUpData:ISignUpData,
        signUp: () => Promise<IResponse>,
        clearSignUpData: () => void,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setSignUpErrors: (signUpErrros: ISignUpDataErrors) => void,
        clearSignUpErrors: () => void,
        setToasterData: (data:IToasterData) => void
    ) => {
        setLoading(true);
        const errors = this.validateData(signUpData);
        
        if(errors && Object.keys(errors).length > 0){
            setSignUpErrors(errors);
            clearSignUpData();
            setToasterData({
                severity: "warning",
                message: "Fill out the form properly",
                open: true,
              });
            setLoading(false);
            return false;
        }

        try {
            const res = await signUp();
            if(res){
                clearSignUpData();
                clearSignUpErrors();
                setToasterData({
                    severity: "success",
                    message: "successfully signed up",
                    open: true,
                });
                setLoading(false);
                return res;
            }
            setLoading(false);
            setToasterData({
              severity: "error",
              message: "sign up fail",
              open: true,
            });
            return false;

        } catch (error) {
            setLoading(false);
            setToasterData({
              severity: "error",
              message: "login fail",
              open: true,
            });
            return false;
        }
    }
}