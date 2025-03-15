// import { FcGoogle } from "react-icons/fc";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useMemo, useState } from "react";
// import { LoginClass } from "./helper";
// import { useSignInStore } from "./store";
// import { ISignInData, ISignInStore } from "./interface";
// import { IGlobalStore } from "../../../global/interface";
// import { useGlobalStore } from "../../../global/store";

// const Login = () => {

//     const navigate = useNavigate();

//     const loginClass = useMemo(() => new LoginClass(), []);

//     // store
//     const setData = useSignInStore((state: ISignInStore) => state.setSignInData);
//     const data: ISignInData = useSignInStore((state: ISignInStore) => state.signInData);
//     const clearData = useSignInStore((state: ISignInStore) => state.clearSignInData);
//     const setDataError = useSignInStore((state: ISignInStore) => state.setSignInDataError);
//     const clearDataError = useSignInStore((state: ISignInStore) => state.clearSignInDataError);

//     const loginUser = useSignInStore((state: ISignInStore) => state.signIn);
//     const user = useGlobalStore((state: IGlobalStore) => state.user);
//     const setUser = useGlobalStore((state: IGlobalStore) => state.setUser);

//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e: React.MouseEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         await loginClass.signIn(
//             data,
//             clearData,
//             setDataError,
//             clearDataError,
//             setLoading,
//             setUser,
//             loginUser,
//         );
//     }

//     useEffect(() => {
//         if (user.token) {
//             localStorage.setItem("token", user.token);
//             if (user.userId !== undefined) {
//                 localStorage.setItem("userId", user.userId.toString()); // Convert number to string
//             }
//             navigate("/");
//         }
//     }, [user, navigate])

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black">
//             <div className="bg-gray-900 text-gray-300 p-8 md:p-12 rounded-lg shadow-xl max-w-md w-full">
//                 <h1 className="text-3xl md:text-4xl font-bold text-[#E26003] text-center mb-6">
//                     Login
//                 </h1>

//                 {/* Email Field */}
//                 <div className="mb-6">
//                     <label htmlFor="email" className="block text-sm font-medium mb-2">
//                         Email Address
//                     </label>
//                     <input
//                         value={data?.email as string}
//                         onChange={(e) => setData({ ...data, email: e.target.value })}
//                         type="email"
//                         id="email"
//                         placeholder="Enter your email"
//                         className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E26003]"
//                     />
//                 </div>

//                 <div className="mb-6">
//                     <label htmlFor="userName" className="block text-sm font-medium mb-2">
//                         User Name
//                     </label>
//                     <input
//                         value={data.userName}
//                         onChange={(e) => setData({ ...data, userName: e.target.value })}
//                         type="text"
//                         id="userName"
//                         placeholder="Enter your UserName"
//                         className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E26003]"
//                     />
//                 </div>

//                 {/* Password Field */}
//                 <div className="mb-6">
//                     <label htmlFor="password" className="block text-sm font-medium mb-2">
//                         Password
//                     </label>
//                     <input
//                         value={data?.password as string}
//                         onChange={(e) => setData({ ...data, password: e.target.value })}
//                         // {...register("password")}
//                         type="password"
//                         id="password"
//                         placeholder="Enter your password"
//                         className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     />
//                 </div>

//                 <div className="mt-6 text-center mb-3">
//                     <button
//                         className="text-sm text-gray-200"
//                     >
//                         Don't have an Account ?  {""}
//                         <Link to="/signup" className="text-gray-400  hover:underline hover:cursor-pointer underline hover:text-white">Sign Up</Link>
//                     </button>
//                 </div>

//                 {/* Login Button */}
//                 <button
//                     onClick={(e) => { handleSubmit(e) }}
//                     className="w-full py-3 bg-[#E26003] text-white rounded-md hover:bg-orange-600 transition mb-2"
//                 >
//                     Login
//                 </button>

//                 {/* forgot password section */}
//                 <div className="flex items-center justify-center mb-2">
//                     <p className="text-gray-400 text-center underline text-sm hover:text-white w-40 mb-4">Forgot Password ?</p>
//                 </div>

//                 <div className="text-center w-full flex justify-center items-center">
//                     {/* OAuth Section */}
//                     <button className="border-gray-400 border flex text-center items-center py-2 px-6 rounded-xl gap-6 tracking-wide font-semibold hover:bg-gray-200 hover:text-[#E26003] hover:font-medium">
//                         <FcGoogle size={30} />
//                         <span className="">Login With Google</span>
//                     </button>
//                 </div>
//             </div>
//         </div >
//     );
// };

// export default Login;

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
        if (user.token) {
            localStorage.setItem("token", user.token);
            if (user.userId !== undefined) {
                localStorage.setItem("userId", user.userId.toString());
            }
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

        <div className="flex min-h-screen bg-black">
            {/* Left side - Form */}
            <div className="w-full ml-auto mr-auto lg:w-1/2 flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-16 xl:px-24">
                <div className="max-w-md w-full mx-auto">
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-white mb-1">Login in to your account</h1>
                        <p className="text-gray-400">Join thousands of learners from around the world</p>
                    </div>

                    {/* Social Sign Up */}
                    <div className="mb-6">
                        <button className="w-full py-3 px-4 border border-gray-800 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-900 transition-all duration-200 shadow-sm">
                            <FcGoogle size={20} />
                            <span className="text-white font-medium">Continue with Google</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-800"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-black text-gray-500">or with email</span>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* Email Field */}
                        <div className="relative">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <HiOutlineMail className="text-gray-500" />
                                </div>
                                <input
                                    type="email"
                                    value={data.email as string}
                                    onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                                    id="email"
                                    placeholder="name@example.com"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <RiUserLine className="text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    value={data.userName as string}
                                    onChange={(e) => { setData({ ...data, userName: e.target.value }) }}
                                    id="userName"
                                    placeholder="Choose a username"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <RiLockPasswordLine className="text-gray-500" />
                                </div>
                                <input
                                    type="password"
                                    value={data.password as string}
                                    onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                                    id="password"
                                    placeholder="Create a strong password"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                />
                            </div>
                        </div>


                        {/* Sign Up Button */}
                        <button
                            onClick={(e) => { handleSubmit(e) }}
                            className="w-full py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all transform hover:scale-[1.02] duration-200 font-medium shadow-md"
                        >
                            {loading ? "Signing in....." : "Login"}
                        </button>

                        {/* Login Link */}
                        <p className="text-center text-gray-400 mt-6">
                            Already have an account?{" "}
                            <Link to="/signup" className="text-orange-500 hover:text-orange-400 font-medium">
                                sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;