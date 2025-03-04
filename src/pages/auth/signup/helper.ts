import { IToasterData } from "../../../global/components/toaster/interface"
import { ISignUpData, ISignUpDataErrors } from "./interface"

export class SignUpHelper{
    validateData(data:ISignUpData){
        const error:ISignUpDataErrors = {} as ISignUpDataErrors
        if(!data.email) error.email = "Email is required"
        if(!data.password) error.password = "Password is required"
        if(data.password !== data.confirmPassword || !data.confirmPassword) error.confirmPassword= "The passwords do not match."
        if(!data.userName) error.userName = "UserName is required"
        return error;
    }

    signUp = async(
        signUpData:ISignUpData,
        signUp: () => Promise<boolean>,
        clearSignUpData: () => void,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setSignUpErrors: (signUpErrros: ISignUpDataErrors) => void,
        clearSignUpErrors: () => void,
        setToasterData: (data:IToasterData) => void
    ) => {

        const errors = this.validateData(signUpData);
        
        if(errors && Object.keys(errors).length > 0){
            setSignUpErrors(errors);
            clearSignUpData();
            setToasterData({
                severity: "warning",
                message: "Fill out the form properly",
                open: true,
              });
            return false;
        }

        try {
            const res = await signUp();
            if(res){
                setLoading(false);
                clearSignUpData();
                clearSignUpErrors();
                setToasterData({
                    severity: "success",
                    message: "successfully signed up",
                    open: true,
                  });
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