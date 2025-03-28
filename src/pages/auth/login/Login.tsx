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

const Login = () => {
    const navigate = useNavigate();
    const loginClass = useMemo(() => new LoginClass(), []);

    const setData = useSignInStore((state: ISignInStore) => state.setSignInData);
    const data: ISignInData = useSignInStore((state: ISignInStore) => state.signInData);
    const clearData = useSignInStore((state: ISignInStore) => state.clearSignInData);
    const setDataError = useSignInStore((state: ISignInStore) => state.setSignInDataError);
    const clearDataError = useSignInStore((state: ISignInStore) => state.clearSignInDataError);

    const loginUser = useSignInStore((state: ISignInStore) => state.signIn);
    const user = useGlobalStore((state: IGlobalStore) => state.user);
    const setUser = useGlobalStore((state: IGlobalStore) => state.setUser);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        setLoading(true);
        await loginClass.signIn(
            data,
            clearData,
            setDataError,
            clearDataError,
            setLoading,
            setUser,
            loginUser,
        );
    }

    useEffect(() => {
        if (user.token && user.userName) {
            localStorage.setItem("token", user.token);
            localStorage.setItem("userName", user.userName);
            navigate("/user-home");
        }
    }, [user, navigate])

    return (
        // <div className="flex min-h-screen">
        //     {/* Left side - Image */}
        //     <div className="hidden lg:flex lg:w-1/2 relative">
        //         <img
        //             src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1484&q=80"
        //             alt="Learning Community"
        //             className="object-cover w-full h-full"
        //         />
        //         <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
        //             <div className="px-12">
        //                 <h2 className="text-4xl font-bold text-white mb-4">Welcome Back!</h2>
        //                 <p className="text-lg text-gray-200">Continue your learning journey with our community.</p>
        //             </div>
        //         </div>
        //     </div>

        //     {/* Right side - Form */}
        //     <div className="w-full lg:w-1/2 bg-gradient-to-b from-gray-900 to-black p-8 lg:p-24 flex items-center">
        //         <div className="w-full max-w-md mx-auto">
        //             <div className="text-center mb-8">
        //                 <h1 className="text-3xl font-bold text-[#E26003] mb-2">Sign In</h1>
        //                 <p className="text-gray-400">Access your learning dashboard</p>
        //             </div>

        //             <div className="space-y-6">
        //                 {/* Email Field */}
        //                 <div>
        //                     <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
        //                         Email Address
        //                     </label>
        //                     <input
        //                         value={data?.email as string}
        //                         onChange={(e) => setData({ ...data, email: e.target.value })}
        //                         type="email"
        //                         id="email"
        //                         placeholder="Enter your email"
        //                         className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E26003] focus:border-transparent transition"
        //                     />
        //                 </div>

        //                 {/* Username */}
        //                 <div>
        //                     <label htmlFor="userName" className="block text-sm font-medium text-gray-300 mb-2">
        //                         Username
        //                     </label>
        //                     <input
        //                         value={data.userName}
        //                         onChange={(e) => setData({ ...data, userName: e.target.value })}
        //                         type="text"
        //                         id="userName"
        //                         placeholder="Enter your username"
        //                         className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E26003] focus:border-transparent transition"
        //                     />
        //                 </div>

        //                 {/* Password Field */}
        //                 <div>
        //                     <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
        //                         Password
        //                     </label>
        //                     <input
        //                         value={data?.password as string}
        //                         onChange={(e) => setData({ ...data, password: e.target.value })}
        //                         type="password"
        //                         id="password"
        //                         placeholder="Enter your password"
        //                         className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E26003] focus:border-transparent transition"
        //                     />
        //                 </div>

        //                 {/* Forgot Password */}
        //                 <div className="text-right">
        //                     <button className="text-sm text-[#E26003] hover:text-orange-400">
        //                         Forgot your password?
        //                     </button>
        //                 </div>

        //                 {/* Login Button */}
        //                 <button
        //                     onClick={(e) => { handleSubmit(e) }}
        //                     className="w-full py-3 bg-[#E26003] text-white rounded-lg hover:bg-orange-600 transition-all transform hover:scale-[1.02] duration-200 font-medium"
        //                 >
        //                     {loading ? "Signing in..." : "Sign in"}
        //                 </button>

        //                 {/* Divider */}
        //                 <div className="relative my-6">
        //                     <div className="absolute inset-0 flex items-center">
        //                         <div className="w-full border-t border-gray-700"></div>
        //                     </div>
        //                     <div className="relative flex justify-center text-sm">
        //                         <span className="px-2 bg-gradient-to-b from-gray-900 to-black text-gray-400">or continue with</span>
        //                     </div>
        //                 </div>

        //                 {/* Google Login */}
        //                 <button className="w-full py-3 px-4 border border-gray-700 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800/50 transition-all duration-200">
        //                     <FcGoogle size={24} />
        //                     <span className="text-gray-300">Sign in with Google</span>
        //                 </button>

        //                 {/* Sign Up Link */}
        //                 <p className="text-center text-gray-400 mt-8">
        //                     Don't have an account?{" "}
        //                     <Link to="/signup" className="text-[#E26003] hover:text-orange-400 font-medium">
        //                         Sign up
        //                     </Link>
        //                 </p>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        // <div className="flex min-h-screen bg-black">
        //     {/* Left side - Form */}
        //     <div className="w-full ml-auto mr-auto lg:w-1/2 flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-16 xl:px-24">
        //         <div className="max-w-md w-full mx-auto">
        //             <div className="mb-10">
        //                 <h1 className="text-3xl font-bold text-white mb-1">Login in to your account</h1>
        //                 <p className="text-gray-400">Join thousands of learners from around the world</p>
        //             </div>

        //             {/* Social Sign Up */}
        //             <div className="mb-6">
        //                 <button className="w-full py-3 px-4 border border-gray-800 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-900 transition-all duration-200 shadow-sm">
        //                     <FcGoogle size={20} />
        //                     <span className="text-white font-medium">Continue with Google</span>
        //                 </button>
        //             </div>

        //             {/* Divider */}
        //             <div className="relative my-6">
        //                 <div className="absolute inset-0 flex items-center">
        //                     <div className="w-full border-t border-gray-800"></div>
        //                 </div>
        //                 <div className="relative flex justify-center text-sm">
        //                     <span className="px-4 bg-black text-gray-500">or with email</span>
        //                 </div>
        //             </div>

        //             <div className="space-y-5">
        //                 {/* Email Field */}
        //                 <div className="relative">
        //                     <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
        //                         Email
        //                     </label>
        //                     <div className="relative">
        //                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        //                             <HiOutlineMail className="text-gray-500" />
        //                         </div>
        //                         <input
        //                             type="email"
        //                             value={data.email as string}
        //                             onChange={(e) => { setData({ ...data, email: e.target.value }) }}
        //                             id="email"
        //                             placeholder="name@example.com"
        //                             className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
        //                         />
        //                     </div>
        //                 </div>

        //                 {/* Username */}
        //                 <div>
        //                     <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
        //                         Username
        //                     </label>
        //                     <div className="relative">
        //                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        //                             <RiUserLine className="text-gray-500" />
        //                         </div>
        //                         <input
        //                             type="text"
        //                             value={data.userName as string}
        //                             onChange={(e) => { setData({ ...data, userName: e.target.value }) }}
        //                             id="userName"
        //                             placeholder="Choose a username"
        //                             className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
        //                         />
        //                     </div>
        //                 </div>

        //                 {/* Password Field */}
        //                 <div>
        //                     <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
        //                         Password
        //                     </label>
        //                     <div className="relative">
        //                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        //                             <RiLockPasswordLine className="text-gray-500" />
        //                         </div>
        //                         <input
        //                             type="password"
        //                             value={data.password as string}
        //                             onChange={(e) => { setData({ ...data, password: e.target.value }) }}
        //                             id="password"
        //                             placeholder="Create a strong password"
        //                             className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
        //                         />
        //                     </div>
        //                 </div>


        //                 {/* Sign Up Button */}
        //                 <button
        //                     onClick={(e) => { handleSubmit(e) }}
        //                     className="w-full py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all transform hover:scale-[1.02] duration-200 font-medium shadow-md"
        //                 >
        //                     {loading ? "Signing in....." : "Login"}
        //                 </button>

        //                 {/* Login Link */}
        //                 <p className="text-center text-gray-400 mt-6">
        //                     Already have an account?{" "}
        //                     <Link to="/signup" className="text-orange-500 hover:text-orange-400 font-medium">
        //                         sign up
        //                     </Link>
        //                 </p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        // <div className="flex min-h-screen">
        //     {/* Left Column - Form */}
        //     <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-16 xl:px-24 bg-white">
        //         <div className="max-w-md w-full mx-auto">
        //             {/* Logo & Welcome Back */}
        //             <div className="mb-10">
        //                 <div className="flex items-center mb-6">
        //                     <span className="text-2xl font-bold text-black">
        //                         learn<span className="text-[#E26300]">Hub</span>
        //                     </span>
        //                 </div>
        //                 <h1 className="text-3xl font-bold text-black mb-2">Welcome back</h1>
        //                 <div className="flex items-center space-x-2 text-sm text-gray-500">
        //                     <span className="flex items-center">
        //                         <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
        //                         2,847 students online
        //                     </span>
        //                     <span>•</span>
        //                     <span>{new Date("2025-03-16 14:00:32").toLocaleTimeString()} UTC</span>
        //                 </div>
        //             </div>

        //             {/* Social Login */}
        //             <div className="space-y-4 mb-8">
        //                 <button className="w-full py-3 px-4 bg-white border border-gray-200 rounded-xl 
        //                                          flex items-center justify-center space-x-2 hover:bg-gray-50 
        //                                          transition-all duration-200 shadow-sm">
        //                     <FcGoogle size={20} />
        //                     <span className="text-gray-600 font-medium">Continue with Google</span>
        //                 </button>
        //             </div>

        //             {/* Divider */}
        //             <div className="relative my-8">
        //                 <div className="absolute inset-0 flex items-center">
        //                     <div className="w-full border-t border-gray-200"></div>
        //                 </div>
        //                 <div className="relative flex justify-center text-sm">
        //                     <span className="px-4 bg-white text-gray-500">or continue with email</span>
        //                 </div>
        //             </div>

        //             {/* Form Fields */}
        //             <div className="space-y-6">
        //                 {/* Email Field */}
        //                 <div>
        //                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
        //                         Email
        //                     </label>
        //                     <div className="relative">
        //                         <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        //                             <HiOutlineMail className="text-gray-400" />
        //                         </div>
        //                         <input
        //                             type="email"
        //                             value={data.email as string}
        //                             onChange={(e) => setData({ ...data, email: e.target.value })}
        //                             id="email"
        //                             placeholder="name@example.com"
        //                             className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
        //                                              text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 
        //                                              focus:ring-[#E26300] focus:border-transparent transition-all"
        //                         />
        //                     </div>
        //                 </div>

        //                 {/* Username Field */}
        //                 <div>
        //                     <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
        //                         Username
        //                     </label>
        //                     <div className="relative">
        //                         <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        //                             <RiUserLine className="text-gray-400" />
        //                         </div>
        //                         <input
        //                             type="text"
        //                             value={data.userName}
        //                             onChange={(e) => setData({ ...data, userName: e.target.value })}
        //                             id="userName"
        //                             placeholder="Your username"
        //                             className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
        //                                              text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 
        //                                              focus:ring-[#E26300] focus:border-transparent transition-all"
        //                         />
        //                     </div>
        //                 </div>

        //                 {/* Password Field */}
        //                 <div>
        //                     <div className="flex items-center justify-between mb-1">
        //                         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        //                             Password
        //                         </label>
        //                         <button className="text-sm text-[#E26300] hover:text-[#E26300]/80 transition-colors">
        //                             Forgot password?
        //                         </button>
        //                     </div>
        //                     <div className="relative">
        //                         <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        //                             <RiLockPasswordLine className="text-gray-400" />
        //                         </div>
        //                         <input
        //                             type="password"
        //                             value={data.password as string}
        //                             onChange={(e) => setData({ ...data, password: e.target.value })}
        //                             id="password"
        //                             placeholder="Enter your password"
        //                             className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
        //                                              text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 
        //                                              focus:ring-[#E26300] focus:border-transparent transition-all"
        //                         />
        //                     </div>
        //                 </div>

        //                 {/* Login Button */}
        //                 <button
        //                     onClick={handleSubmit}
        //                     className="w-full py-3 bg-black text-white rounded-xl hover:bg-[#E26300] 
        //                                      transition-all transform hover:scale-[1.02] duration-200 
        //                                      font-medium shadow-md"
        //                 >
        //                     {loading ? (
        //                         <div className="flex items-center justify-center space-x-2">
        //                             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        //                             <span>Signing in...</span>
        //                         </div>
        //                     ) : (
        //                         "Sign in"
        //                     )}
        //                 </button>

        //                 {/* Sign Up Link */}
        //                 <p className="text-center text-gray-600 mt-6">
        //                     Don't have an account?{" "}
        //                     <Link to="/signup" className="text-[#E26300] hover:text-[#E26300]/80 font-medium">
        //                         Create an account
        //                     </Link>
        //                 </p>
        //             </div>
        //         </div>
        //     </div>

        //     {/* Right Column - Image/Pattern */}
        //     <div className="hidden lg:block lg:w-1/2 bg-black relative overflow-hidden">
        //         <div className="absolute inset-0 bg-gradient-to-br from-[#E26300]/20 to-black"></div>
        //         <div className="absolute inset-0 bg-[url('/path-to-your-pattern.svg')] opacity-10"></div>
        //         <div className="relative h-full flex items-center justify-center p-12">
        //             <div className="text-center">
        //                 <h2 className="text-4xl font-bold text-white mb-6">
        //                     Join our learning community
        //                 </h2>
        //                 <p className="text-gray-400 max-w-md mx-auto">
        //                     Connect with {new Intl.NumberFormat().format(2847)} students
        //                     currently online and start your learning journey together.
        //                 </p>
        //             </div>
        //         </div>
        //     </div>
        // </div>

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
                        Welcome back
                    </h1>
                    {/* <p className="text-gray-500">
                        Continue your learning journey with 2.8k+ peers online
                    </p> */}
                </div>

                {/* Social Login */}
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
                            <button type="button"
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

                {/* Bottom Badge */}
                {/* <div className="mt-10 text-center">
                    <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                        <span className="flex items-center">
                            {""}
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>{""}
                            2.8k+ students online
                        </span>
                        <span>•</span>
                        <span>Instant access</span>
                    </div>
                </div> */}
            </div>
        </div>
    );
};
export default Login;