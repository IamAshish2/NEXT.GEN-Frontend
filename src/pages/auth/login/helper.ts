import { ISignInData, ISignInDataError } from "./interface";

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
        setUser: (data: {
            token: string;
        }) => void,
        loginUser: () => Promise<false | {token: string}>,
    ) => {
        const errors = this.validateData(data);
        if(Object.keys(errors).length > 0){
            setLoading(false);
            setSignInDataError(errors);
            return false;
        }

        try {
            const res = await loginUser();
            if(res && Object.keys(res).length > 0){
                setUser({
                    token: res?.token
                  });
                
                setLoading(false);
                clearSignInData();
                clearSignInDataError();
                return true;
            }
        } catch (error) {
            setLoading(false);
            return false;
        }
    }
}