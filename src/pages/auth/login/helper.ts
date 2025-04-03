import { AlertColor } from "@mui/material";
import { ISignInData, ISignInDataError } from "./interface";
import { IResponse } from "@/global/interface";

export class LoginClass {

    validateData = (data:ISignInData) => {
        const error: ISignInDataError = {} as ISignInDataError
        if(!data.email) {
            return {message:"The email cannot be empty!",severity:"error" as AlertColor}
        }

        if(!data.userName) {
            return {message:"The username cannot be empty!",severity:"error" as AlertColor}
        }

        if(!data.password)  return {message:"Password is required",severity:"error" as AlertColor}
        return error;
    }

   signIn = async(
        data: ISignInData,
        clearSignInData: () => void,
        setSignInDataError : (signInDataError: ISignInDataError) => void ,
        clearSignInDataError: () => void,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        loginUser: () => Promise<IResponse>,
    ) => {

        setLoading(true);
        const errors = this.validateData(data);
        if(Object.keys(errors).length > 0){
            setLoading(false);
            setSignInDataError(errors);
            setLoading(false);
            return false;
        }

        try {
            const res = await loginUser();
            clearSignInData();
            clearSignInDataError();
            setLoading(false);
            return res;
        } catch (error: any) {
            setLoading(false);
        }
    }
}