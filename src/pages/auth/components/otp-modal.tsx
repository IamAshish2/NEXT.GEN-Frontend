import React, { useState } from 'react';
import { OtpModalProps } from './interface';
import { useOtpStore } from './store';
import { useGlobalStore } from '@/global/store';
import { AlertColor } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSignInStore } from '../login/store';


const OtpModal = ({ email, onClose }: OtpModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { setIsOtpVerified } = useSignInStore();
    const { data, verifyOtp, clearData, setData } = useOtpStore();
    const { setToasterData } = useGlobalStore();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const verificationData = {
            email: email,
            code: data.code
        };

        if (!data.code || data.code.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        setIsLoading(true);
        try {
            console.log(verificationData);

            const res = await verifyOtp(verificationData);

            if (res) {
                setToasterData({ message: res.message, severity: res.severity as AlertColor, open: true });
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
        } catch (err: any) {
            setError(err.message || 'Failed to resend OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative p-6">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
                <p className="text-gray-600 mb-6">
                    We've sent a 6-digit verification code to <strong className="text-gray-800">{email}</strong>
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={6}
                            value={data.code}
                            onChange={(e) => setData({ ...data, code: e.target.value.replace(/\D/g, '') })}
                            placeholder="Enter OTP"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-xl tracking-widest"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div className="mb-4 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`w-full py-3 px-4 rounded-md text-white font-medium ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                            </span>
                        ) : 'Verify'}
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                    Didn't receive the code?{' '}
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={isLoading}
                        className={`font-medium ${isLoading ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'} transition-colors`}
                    >
                        Resend OTP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OtpModal;