import React, { useState } from 'react';
import { useGlobalStore } from '@/global/store';
import { AlertColor } from '@mui/material';
import { useVerifyOtpStore } from './store';
import { useForgotPasswordStore } from '../forgot-password/store';
import { useSignInStore } from '../../login/store';
import { ArrowRight } from 'lucide-react';
import { RiShieldKeyholeLine } from 'react-icons/ri';

const VerifyOtp = ({ onClose }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { data, setData, verifyOtp, clearData } = useVerifyOtpStore();
    const { setIsOtpVerified } = useSignInStore();
    const { email } = useForgotPasswordStore();
    const { setToasterData } = useGlobalStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const verificationData = {
            email: email as string,
            code: data.code
        };

        if (!data.code || data.code.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        setIsLoading(true);
        try {
            const res = await verifyOtp(verificationData);

            if (res) {
                setToasterData({ message: res.message, severity: res.severity as AlertColor, open: true });
                clearData();
            }

            if (res.severity === "success") {
                clearData();
                setIsOtpVerified(true);
            }
        } catch (err: any) {
            setError(err.message || 'Verification failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setError('');
        setIsLoading(true);
        try {
            // await onResend();
            setToasterData({
                message: "OTP resent successfully",
                severity: "success" as AlertColor,
                open: true
            });
        } catch (err: any) {
            setError(err.message || 'Failed to resend OTP. Please try again.');
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

                    <h2 className="text-2xl font-bold text-black mb-2">Verify Your Code</h2>
                    <p className="text-gray-600">
                        We've sent a 6-digit verification code to <br />
                        <strong className="text-gray-800 font-medium">{email as string}</strong>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="otp-input" className="block text-sm font-medium text-gray-700">
                            Verification Code
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <RiShieldKeyholeLine className="w-5 h-5 text-gray-400 
                                                      group-focus-within:text-[#E26300] transition-colors" />
                            </div>
                            <input
                                id="otp-input"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={6}
                                value={data.code}
                                onChange={(e) => setData({ ...data, code: e.target.value.replace(/\D/g, '') })}
                                placeholder="Enter 6-digit code"
                                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 
                                       rounded-xl text-gray-900 placeholder:text-gray-400 
                                       focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                       focus:border-[#E26300] transition-all text-center tracking-widest"
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
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                <>
                                    <span>Verify Code</span>
                                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 
                                                  transition-transform" />
                                </>
                            )}
                        </span>
                    </button>

                    {/* Resend OTP option */}
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={isLoading}
                            className="text-sm text-[#E26300] hover:text-[#c55700] hover:underline transition-colors"
                        >
                            Didn't receive a code? Resend
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;