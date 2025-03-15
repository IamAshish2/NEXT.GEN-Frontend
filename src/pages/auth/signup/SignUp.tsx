// import { useMemo, useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { Link, useNavigate } from "react-router-dom";
// import { SignUpHelper } from "./helper";
// import { useSignUpStore } from "./store";
// import { ISignUpData, ISignUpStore } from "./interface";
// import Loader from "../../../global/components/Loader";
// import { useGlobalStore } from "../../../global/store";


// const SignUp = () => {
//     const navigate = useNavigate();

//     // class for signup 
//     const signUpClass = useMemo(() => new SignUpHelper(), []);

//     const setData = useSignUpStore((state: ISignUpStore) => state.setSignUpData);
//     const data: ISignUpData = useSignUpStore((state: ISignUpStore) => state.signUpData);
//     const clearData = useSignUpStore((state: ISignUpStore) => state.clearSignUpData);

//     const setErrors = useSignUpStore((state: ISignUpStore) => state.setSignUpErrors);
//     const clearErrors = useSignUpStore((state: ISignUpStore) => state.clearSignUpErrors);

//     const signUp = useSignUpStore((state: ISignUpStore) => state.SignUp);
//     const [loading, setLoading] = useState(false);

//     const { setToasterData } = useGlobalStore();


//     async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
//         e.preventDefault();

//         const status = await signUpClass.signUp(
//             data,
//             signUp,
//             clearData,
//             setLoading,
//             setErrors,
//             clearErrors,
//             setToasterData
//         );

//         if (status) {
//             navigate('/login')
//         }
//     }

//     if (loading) return (<Loader />)

//     return (
//         <div className="flex min-h-screen  items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black">
//             <div className="bg-gray-900 h-full p-8 ml-2 text-gray-300  md:p-12  rounded-lg shadow-xl max-w-md w-full">
//                 <h1 className="text-3xl md:text-4xl font-bold text-[#E26003] text-center mb-6">
//                     Sign Up
//                 </h1>

//                 {/* Email Field */}
//                 <div className="mb-4">
//                     <label htmlFor="email" className="block text-sm font-medium mb-2">
//                         Email Address
//                     </label>
//                     <input
//                         type="email"
//                         value={data.email as string}
//                         onChange={(e) => { setData({ ...data, email: e.target.value }) }}
//                         id="email"
//                         placeholder="Enter your email"
//                         className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E26003]"
//                     />
//                 </div>

//                 {/* username */}
//                 <div className="mb-4">
//                     <label htmlFor="username" className="block text-sm font-medium mb-2">
//                         UserName
//                     </label>
//                     <input
//                         type="text"
//                         value={data.userName as string}
//                         onChange={(e) => { setData({ ...data, userName: e.target.value }) }}
//                         id="userName"
//                         placeholder="Enter a username"
//                         className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     />
//                 </div>

//                 {/* Password Field */}
//                 <div className="mb-4">
//                     <label htmlFor="password" className="block text-sm font-medium mb-2">
//                         Password
//                     </label>
//                     <input
//                         type="password"
//                         value={data.password as string}
//                         onChange={(e) => { setData({ ...data, password: e.target.value }) }}
//                         id="password"
//                         placeholder="Enter your password"
//                         className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     />
//                 </div>

//                 {/* Confirm Password Field */}
//                 <div className="mb-4">
//                     <label
//                         htmlFor="password"
//                         className="block text-sm font-medium mb-2"
//                     >
//                         Confirm Password
//                     </label>
//                     <input
//                         value={data.confirmPassword as string}
//                         onChange={(e) => { setData({ ...data, confirmPassword: e.target.value }) }}
//                         type="password"
//                         id="password"
//                         placeholder="Confirm your password"
//                         className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     />
//                 </div>

//                 <div className="mt-6 text-center mb-3">
//                     <button
//                         className="text-sm text-gray-200"
//                     >
//                         Already have an Account ?  {""}
//                         <Link to="/login" className="text-gray-400  hover:underline hover:cursor-pointer underline hover:text-white">Login</Link>
//                     </button>
//                 </div>

//                 {/* Login Button */}
//                 <button
//                     onClick={(e) => { handleSubmit(e) }}
//                     className="w-full py-3 bg-[#E26003] text-white rounded-md hover:bg-orange-600 transition mb-4"
//                 >
//                     {loading ? "Signing in" : "Sign up"}
//                 </button>

//                 <div className="text-center w-full flex justify-center items-center">
//                     {/* OAuth Section */}
//                     <button className="border-gray-400 border flex text-center items-center py-2 px-6 rounded-xl gap-6 tracking-wide font-semibold hover:bg-gray-200 hover:text-[#E26003] hover:font-medium">
//                         <FcGoogle size={30} />
//                         <span className="">Sign Up With Google</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUp;

// import { useMemo, useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { Link, useNavigate } from "react-router-dom";
// import { SignUpHelper } from "./helper";
// import { useSignUpStore } from "./store";
// import { ISignUpData, ISignUpStore } from "./interface";
// import Loader from "../../../global/components/Loader";
// import { useGlobalStore } from "../../../global/store";

// const SignUp = () => {
//     const navigate = useNavigate();
//     const signUpClass = useMemo(() => new SignUpHelper(), []);

//     const setData = useSignUpStore((state: ISignUpStore) => state.setSignUpData);
//     const data: ISignUpData = useSignUpStore((state: ISignUpStore) => state.signUpData);
//     const clearData = useSignUpStore((state: ISignUpStore) => state.clearSignUpData);
//     const setErrors = useSignUpStore((state: ISignUpStore) => state.setSignUpErrors);
//     const clearErrors = useSignUpStore((state: ISignUpStore) => state.clearSignUpErrors);
//     const signUp = useSignUpStore((state: ISignUpStore) => state.SignUp);
//     const [loading, setLoading] = useState(false);
//     const { setToasterData } = useGlobalStore();

//     async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
//         e.preventDefault();
//         const status = await signUpClass.signUp(
//             data,
//             signUp,
//             clearData,
//             setLoading,
//             setErrors,
//             clearErrors,
//             setToasterData
//         );
//         if (status) {
//             navigate('/login')
//         }
//     }

//     if (loading) return (<Loader />)

//     return (
//         <div className="flex ">
//             {/* Left side - Image */}
//             <div className="hidden lg:flex lg:w-1/2 relative">
//                 <img 
//                     src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
//                     alt="Learning Community" 
//                     className="object-cover w-full h-full"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
//                     <div className="px-12">
//                         <h2 className="text-4xl font-bold text-white mb-4">Join Our Learning Community</h2>
//                         <p className="text-lg text-gray-200">Connect with peers, access curated resources, and grow together.</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Right side - Form */}
//             <div className="w-full lg:w-1/2 bg-gradient-to-b from-gray-900 to-black p-8 lg:p-24 flex items-center">
//                 <div className="w-full max-w-md mx-auto">
//                     <div className="text-center mb-8">
//                         <h1 className="text-3xl font-bold text-[#E26003] mb-2">Create Account</h1>
//                         <p className="text-gray-400">Start your learning journey today</p>
//                     </div>

//                     <div className="space-y-6">
//                         {/* Email Field */}
//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
//                                 Email Address
//                             </label>
//                             <input
//                                 type="email"
//                                 value={data.email as string}
//                                 onChange={(e) => { setData({ ...data, email: e.target.value }) }}
//                                 id="email"
//                                 placeholder="Enter your email"
//                                 className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E26003] focus:border-transparent transition"
//                             />
//                         </div>

//                         {/* Username */}
//                         <div>
//                             <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
//                                 Username
//                             </label>
//                             <input
//                                 type="text"
//                                 value={data.userName as string}
//                                 onChange={(e) => { setData({ ...data, userName: e.target.value }) }}
//                                 id="userName"
//                                 placeholder="Choose a username"
//                                 className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E26003] focus:border-transparent transition"
//                             />
//                         </div>

//                         {/* Password Field */}
//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 value={data.password as string}
//                                 onChange={(e) => { setData({ ...data, password: e.target.value }) }}
//                                 id="password"
//                                 placeholder="Create a strong password"
//                                 className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E26003] focus:border-transparent transition"
//                             />
//                         </div>

//                         {/* Confirm Password Field */}
//                         <div>
//                             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
//                                 Confirm Password
//                             </label>
//                             <input
//                                 value={data.confirmPassword as string}
//                                 onChange={(e) => { setData({ ...data, confirmPassword: e.target.value }) }}
//                                 type="password"
//                                 id="confirmPassword"
//                                 placeholder="Confirm your password"
//                                 className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E26003] focus:border-transparent transition"
//                             />
//                         </div>

//                         {/* Sign Up Button */}
//                         <button
//                             onClick={(e) => { handleSubmit(e) }}
//                             className="w-full py-3 bg-[#E26003] text-white rounded-lg hover:bg-orange-600 transition-all transform hover:scale-[1.02] duration-200 font-medium"
//                         >
//                             {loading ? "Creating account..." : "Create Account"}
//                         </button>

//                         {/* Divider */}
//                         <div className="relative my-6">
//                             <div className="absolute inset-0 flex items-center">
//                                 <div className="w-full border-t border-gray-700"></div>
//                             </div>
//                             <div className="relative flex justify-center text-sm">
//                                 <span className="px-2 bg-gradient-to-b from-gray-900 to-black text-gray-400">or continue with</span>
//                             </div>
//                         </div>

//                         {/* Google Sign Up */}
//                         <button className="w-full py-3 px-4 border border-gray-700 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800/50 transition-all duration-200">
//                             <FcGoogle size={24} />
//                             <span className="text-gray-300">Sign up with Google</span>
//                         </button>

//                         {/* Login Link */}
//                         <p className="text-center text-gray-400 mt-8">
//                             Already have an account?{" "}
//                             <Link to="/login" className="text-[#E26003] hover:text-orange-400 font-medium">
//                                 Sign in
//                             </Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUp;

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
        <div className="flex min-h-screen bg-black">
            {/* Left side - Form */}
            <div className="w-full ml-auto mr-auto lg:w-1/2 flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-16 xl:px-24">
                <div className="max-w-md w-full mx-auto">
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-white mb-1">Create your account</h1>
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

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <RiLockPasswordLine className="text-gray-500" />
                                </div>
                                <input
                                    value={data.confirmPassword as string}
                                    onChange={(e) => { setData({ ...data, confirmPassword: e.target.value }) }}
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm your password"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                />
                            </div>
                        </div>

                        {/* Sign Up Button */}
                        <button
                            onClick={(e) => { handleSubmit(e) }}
                            className="w-full py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all transform hover:scale-[1.02] duration-200 font-medium shadow-md"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>

                        {/* Login Link */}
                        <p className="text-center text-gray-400 mt-6">
                            Already have an account?{" "}
                            <Link to="/login" className="text-orange-500 hover:text-orange-400 font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Image */}
                {/* <div className="hidden lg:block lg:w-1/2 relative bg-black">
                    <div className="absolute inset-0 bg-gradient-to-br from-black to-orange-900 opacity-90"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1548092372-0d1bd40894a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                        alt="Community of learners" 
                        className="object-cover w-full h-full mix-blend-overlay opacity-60"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center px-12 lg:px-16">
                        <div className="max-w-md">
                            <h2 className="text-4xl font-bold text-white mb-4">Elevate Your Skills</h2>
                            <p className="text-lg text-gray-300 mb-8">Join our exclusive community of learners and access premium courses designed for tomorrow's innovators.</p>
                            
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-orange-500/20 p-3 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">Premium Course Library</h3>
                                        <p className="text-gray-400 text-sm">Access elite courses across technology, business and design</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                    <div className="bg-orange-500/20 p-3 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">Exclusive Community</h3>
                                        <p className="text-gray-400 text-sm">Network with industry professionals and like-minded learners</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                    <div className="bg-orange-500/20 p-3 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">Industry Certifications</h3>
                                        <p className="text-gray-400 text-sm">Earn credentials recognized by top employers worldwide</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
        </div>
    );
};

export default SignUp;