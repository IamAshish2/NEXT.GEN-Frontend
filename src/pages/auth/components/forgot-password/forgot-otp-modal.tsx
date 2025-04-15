import { useGlobalStore } from "@/global/store";
import { useState } from "react";
import { useForgotPasswordStore } from "./store";
import { AlertColor } from "@mui/material";
import { IForgotOptModalProps } from "./interface";
import { useSignInStore } from "../../login/store";
import { ArrowRight } from "lucide-react";
import { RiMailLine } from "react-icons/ri";
import { ForgotPasswordStep } from "@/global/enums";

const ForgotPasswordOtpModal = ({ onClose }: IForgotOptModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { email, setEmail, forgotPassword } = useForgotPasswordStore();
    const { setCurrentStep } = useSignInStore();

    const { setToasterData } = useGlobalStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (email === "" || !validateEmail(email as string)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        try {
            const res = await forgotPassword();

            if (res) {
                setToasterData({ message: res.message, severity: res.severity as AlertColor, open: true });
            }

            if (res.severity === "success") {
                setCurrentStep(ForgotPasswordStep.OTP)
            }

        } catch (err: any) {
            setError(err.message || 'Verification failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleResend = async () => {
        setError('');

        if (email === "" || !validateEmail(email as string)) {
            setError('Please enter a valid email address first');
            return;
        }

        setIsLoading(true);
        try {
            const res = await forgotPassword();

            if (res) {
                setToasterData({
                    message: "Verification code resent successfully",
                    severity: "success" as AlertColor,
                    open: true
                });
            }
        } catch (err: any) {
            setError(err.message || 'Failed to resend code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-[440px] mx-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl 
                               w-8 h-8 flex items-center justify-center rounded-full 
                               hover:bg-gray-100 transition-colors"
                    aria-label="Close"
                >
                    &times;
                </button>

                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center mb-6">
                        <span className="text-3xl font-bold text-black">
                            NEXT<span className="text-[#E26300]">.GEN</span>
                        </span>
                    </div>

                    <h2 className="text-2xl font-bold text-black mb-2">Reset Password</h2>
                    <p className="text-gray-600">
                        Enter your email address and we'll send you a verification code to reset your password
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="email"
                            className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <RiMailLine className="w-5 h-5 text-gray-400 
                                                 group-focus-within:text-[#E26300] transition-colors" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                value={email as string}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 
                                         rounded-xl text-gray-900 placeholder:text-gray-400 
                                         focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                         focus:border-[#E26300] transition-all"
                                placeholder="Enter your email address"
                                autoFocus
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="px-3 py-2 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="relative w-full py-4 px-6 bg-black text-white rounded-xl
                                 hover:bg-[#E26300] focus:outline-none focus:ring-2 
                                 focus:ring-[#E26300]/50 transition-all duration-200 
                                 overflow-hidden group"
                        disabled={isLoading}
                    >
                        <span className="relative flex items-center justify-center">
                            {isLoading ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin mr-2"
                                        viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10"
                                            stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Sending Code...</span>
                                </>
                            ) : (
                                <>
                                    <span>Send Verification Code</span>
                                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 
                                                      transition-transform" />
                                </>
                            )}
                        </span>
                    </button>

                    {/* Resend Option */}
                    <div className="text-center pt-2">
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={isLoading}
                            className="text-sm text-[#E26300] hover:text-[#c55700] hover:underline transition-colors"
                        >
                            Already requested a code? Resend it
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPasswordOtpModal;