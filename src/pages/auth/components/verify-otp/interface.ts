import { IResponse } from "@/global/interface";

export interface IOtpData {
    email: string;
    code: string;
}

export interface IVerifyOtpStore {
    data: IOtpData;
    setData: (data:IOtpData) => void;
    verifyOtp: (data:IOtpData) => Promise<IResponse>;
    clearData: () => void;
}
