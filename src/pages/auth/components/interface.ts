import { IResponse } from "@/global/interface"

export type OtpModalProps = {
    email: string,
    // onVerify: (otp: string) => void,
    // onResend: () => void,
    onClose: () => void
}

export type IOtpVerifyRequestData = {
    email: string,
    code: string
}


export interface IOtpModalStore {
    data: IOtpVerifyRequestData,
    setData: (data:IOtpVerifyRequestData) => void,
    verifyOtp: (data:IOtpVerifyRequestData) => Promise<IResponse>
    clearData: () => void
}