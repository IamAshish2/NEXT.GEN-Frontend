import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { LoginClass } from "./helper";
import { useSignInStore } from "./store";
import { ISignInData, ISignInStore } from "./interface";
import { IGlobalStore } from "../../../global/interface";
import { useGlobalStore } from "../../../global/store";
import { RiLockPasswordLine, RiUserLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { ArrowRight } from "lucide-react";
import { AlertColor } from "@mui/material";
import { port } from "@/global/config";
import ForgotPasswordOtpModal from "../components/forgot-password/forgot-otp-modal";
import VerifyOtp from "../components/verify-otp/verify-otp";
import UpdatePasswordForm from "../components/update-password/update-password-form";

const Login = () => {

    const { setToasterData } = useGlobalStore();

    const navigate = useNavigate();
    const loginClass = useMemo(() => new LoginClass(), []);
    const { isResettingPassword, setIsResetttingPassword, isEmailVerified, setIsEmailVerified, isOtpVerified } = useSignInStore();

    const setData = useSignInStore((state: ISignInStore) => state.setSignInData);
    const data: ISignInData = useSignInStore((state: ISignInStore) => state.signInData);
    const clearData = useSignInStore((state: ISignInStore) => state.clearSignInData);
    const setDataError = useSignInStore((state: ISignInStore) => state.setSignInDataError);
    const clearDataError = useSignInStore((state: ISignInStore) => state.clearSignInDataError);
    const dataError = useSignInStore((state: ISignInStore) => state.signInDataError);

    const loginUser = useSignInStore((state: ISignInStore) => state.signIn);
    const user = useGlobalStore((state: IGlobalStore) => state.user);
    const setUser = useGlobalStore((state: IGlobalStore) => state.setUser);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await loginClass.signIn(
            data,
            clearData,
            setDataError,
            clearDataError,
            setLoading,
            loginUser,
        );

        // for form validation
        if (!res) {
            setToasterData({ message: dataError.message, severity: dataError.severity as AlertColor, open: true });
        }

        if (res) {
            setToasterData({ message: res.message, severity: res.severity as AlertColor, open: true });
        }

    }

    console.log(isOtpVerified);


    useEffect(() => {
        if (user.userName) {
            navigate("/user-home");
        }
    }, [setUser, user, loginUser, navigate])

    function handleGoogleLogin() {
        window.location.href = `https://localhost:${port}/api/account/login/google?returnUrl=http://localhost:5173/user-home`;
    }

    return (
        <>
            {!isResettingPassword && !isEmailVerified && !isOtpVerified && <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="w-full max-w-[440px] mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center mb-8">
                            <span className="text-3xl font-bold text-black">
                                NEXT<span className="text-[#E26300]">.GEN</span>
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-black mb-3">
                            Welcome back
                        </h1>
                    </div>

                    {/* Social Login */}
                    <button onClick={handleGoogleLogin} className="w-full mb-6 py-4 px-6 bg-white rounded-2xl border border-gray-200 
                                         flex items-center justify-center space-x-3 hover:border-gray-300 
                                         transition-all duration-200 group">
                        <FcGoogle className="w-5 h-5" />
                        <span className="text-gray-600 font-medium group-hover:text-black transition-colors">
                            Continue with Google
                        </span>
                    </button>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-400">or continue with email</span>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email"
                                className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <HiOutlineMail className="w-5 h-5 text-gray-400 group-focus-within:text-[#E26300] 
                                                                transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email as string}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 
                                                 rounded-xl text-gray-900 placeholder:text-gray-400 
                                                 focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                                 focus:border-[#E26300] transition-all"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        {/* Username Field */}
                        <div className="space-y-2">
                            <label htmlFor="username"
                                className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <RiUserLine className="w-5 h-5 text-gray-400 group-focus-within:text-[#E26300] 
                                                             transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    value={data.userName}
                                    onChange={(e) => setData({ ...data, userName: e.target.value })}
                                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 
                                                 rounded-xl text-gray-900 placeholder:text-gray-400 
                                                 focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                                 focus:border-[#E26300] transition-all"
                                    placeholder="Your username"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                    className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <button type="button" onClick={() => { setIsResetttingPassword(true) }}
                                    className="text-sm text-[#E26300] hover:text-[#E26300]/80 transition-colors">
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <RiLockPasswordLine className="w-5 h-5 text-gray-400 
                                                                     group-focus-within:text-[#E26300] transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    value={data.password as string}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 
                                                 rounded-xl text-gray-900 placeholder:text-gray-400 
                                                 focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                                 focus:border-[#E26300] transition-all"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="relative w-full py-4 px-6 bg-black text-white rounded-xl
                                         hover:bg-[#E26300] focus:outline-none focus:ring-2 
                                         focus:ring-[#E26300]/50 transition-all duration-200 
                                         overflow-hidden group"
                        >
                            <span className="relative flex items-center justify-center">
                                {loading ? (
                                    <>
                                        <svg className="w-5 h-5 animate-spin mr-2"
                                            viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10"
                                                stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign in</span>
                                        <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 
                                                                transition-transform" />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="mt-8 text-center text-gray-500">
                        Don't have an account?{" "}
                        <Link to="/signup"
                            className="font-medium text-[#E26300] hover:text-[#E26300]/80 transition-colors">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>}

            {isResettingPassword && !isOtpVerified && <ForgotPasswordOtpModal onClose={() => { setIsResetttingPassword(false) }} />}
            {isEmailVerified && !isOtpVerified && <VerifyOtp onClose={() => { setIsEmailVerified(false) }} />}
            {isOtpVerified && <UpdatePasswordForm />}
        </>
    );
};
export default Login;