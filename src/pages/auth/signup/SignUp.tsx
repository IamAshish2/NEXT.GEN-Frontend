import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpHelper } from "./helper";
import { useSignUpStore } from "./store";
import { ISignUpData, ISignUpStore } from "./interface";
import Loader from "../../../global/components/Loader";
import { useGlobalStore } from "../../../global/store";

// Import icons
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine, RiUserLine } from "react-icons/ri";
import { ArrowRight } from "lucide-react";

const SignUp = () => {
    const navigate = useNavigate();
    const signUpClass = useMemo(() => new SignUpHelper(), []);

    const setData = useSignUpStore((state: ISignUpStore) => state.setSignUpData);
    const data: ISignUpData = useSignUpStore((state: ISignUpStore) => state.signUpData);
    const clearData = useSignUpStore((state: ISignUpStore) => state.clearSignUpData);
    const setErrors = useSignUpStore((state: ISignUpStore) => state.setSignUpErrors);
    const clearErrors = useSignUpStore((state: ISignUpStore) => state.clearSignUpErrors);
    const signUp = useSignUpStore((state: ISignUpStore) => state.SignUp);
    const [loading, setLoading] = useState(false);
    const { setToasterData } = useGlobalStore();

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const status = await signUpClass.signUp(
            data,
            signUp,
            clearData,
            setLoading,
            setErrors,
            clearErrors,
            setToasterData
        );
        if (status) {
            navigate('/login')
        }
    }

    if (loading) return (<Loader />)

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-[440px] mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center mb-8">
                        <span className="text-3xl font-bold text-black">
                            NEXT<span className="text-[#E26300]">.GEN</span>
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-black mb-3">
                        Create your account
                    </h1>
                    <p className="text-gray-500">
                        Join our growing community of learners
                    </p>
                </div>

                {/* Google Sign Up */}
                <button className="w-full mb-6 py-4 px-6 bg-white rounded-2xl border border-gray-200 
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

                {/* Sign Up Form */}
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
                                value={data.userName as string}
                                onChange={(e) => setData({ ...data, userName: e.target.value })}
                                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 
                                                 rounded-xl text-gray-900 placeholder:text-gray-400 
                                                 focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                                 focus:border-[#E26300] transition-all"
                                placeholder="Choose a username"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="password"
                            className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
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
                                placeholder="Create a strong password"
                            />
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <RiLockPasswordLine className="w-5 h-5 text-gray-400 
                                                                     group-focus-within:text-[#E26300] transition-colors" />
                            </div>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={data.confirmPassword as string}
                                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 
                                                 rounded-xl text-gray-900 placeholder:text-gray-400 
                                                 focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                                 focus:border-[#E26300] transition-all"
                                placeholder="Confirm your password"
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
                                         overflow-hidden group mt-6"
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
                                    <span>Creating account...</span>
                                </>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 
                                                                transition-transform" />
                                </>
                            )}
                        </span>
                    </button>
                </form>

                {/* Sign In Link */}
                <p className="mt-8 text-center text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login"
                        className="font-medium text-[#E26300] hover:text-[#E26300]/80 transition-colors">
                        Sign in
                    </Link>
                </p>

                {/* Bottom Badge */}
                <div className="mt-10 text-center">
                    <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                        <span className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
                            2.8k+ students online
                        </span>
                        <span>•</span>
                        <span>Join them today</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;