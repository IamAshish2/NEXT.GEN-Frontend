import { ISignInData, ISignInDataError } from "./interface";
import { AxiosResponse } from "axios";
import { useGlobalStore } from "@/global/store";
import { IUserData } from "@/global/interface";

export class LoginClass {

    validateData = (data:ISignInData) => {
        const error: ISignInDataError = {} as ISignInDataError
        if(!data.email) error.email = "Email is required."
        if(!data.password) error.password = "Password is required."
        return error;
    }

   signIn = async(
        data: ISignInData,
        clearSignInData: () => void,
        setSignInDataError : (signInDataError: ISignInDataError) => void ,
        clearSignInDataError: () => void,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setUser: (data: IUserData) => void,
        // loginUser: () => Promise<IResponse>,
        loginUser: () => Promise<void | AxiosResponse>
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
            
            if(res && Object.keys(res).length > 0){
                const data = res?.data;

                const user = useGlobalStore.getState().user;
                setUser({
                    ...user,
                    userName: data?.userName
                })
            
                  clearSignInData();
                  clearSignInDataError();
                  setLoading(false);
                //   return res?.status >= 200 && res?.status <= 300 
                //   ? {message: res?.data?.message , severity: "success"}
                //    :  { message: res?.data?.message, severity: "error" };
            }
        } catch (error) {
            console.log('error c=occured');
            
            setLoading(false);
        }
    }
}