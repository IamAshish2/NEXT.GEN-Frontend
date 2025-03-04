import { useMemo, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { SignUpHelper } from "./helper";
import { useSignUpStore } from "./store";
import { ISignUpData, ISignUpStore } from "./interface";
import Loader from "../../../global/components/Loader";
import { useGlobalStore } from "../../../global/store";


const SignUp = () => {
    const navigate = useNavigate();

    // class for signup 
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
        <div className="flex min-h-screen  items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black">
            <div className="bg-gray-900 h-full p-8 ml-2 text-gray-300  md:p-12  rounded-lg shadow-xl max-w-md w-full">
                <h1 className="text-3xl md:text-4xl font-bold text-[#E26003] text-center mb-6">
                    Sign Up
                </h1>

                {/* Email Field */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={data.email as string}
                        onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                        id="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E26003]"
                    />
                </div>

                {/* username */}
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium mb-2">
                        UserName
                    </label>
                    <input
                        type="text"
                        value={data.userName as string}
                        onChange={(e) => { setData({ ...data, userName: e.target.value }) }}
                        id="userName"
                        placeholder="Enter a username"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </div>

                {/* Password Field */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        value={data.password as string}
                        onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                        id="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </div>

                {/* Confirm Password Field */}
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium mb-2"
                    >
                        Confirm Password
                    </label>
                    <input
                        value={data.confirmPassword as string}
                        onChange={(e) => { setData({ ...data, confirmPassword: e.target.value }) }}
                        type="password"
                        id="password"
                        placeholder="Confirm your password"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </div>

                <div className="mt-6 text-center mb-3">
                    <button
                        className="text-sm text-gray-200"
                    >
                        Already have an Account ?  {""}
                        <Link to="/login" className="text-gray-400  hover:underline hover:cursor-pointer underline hover:text-white">Login</Link>
                    </button>
                </div>

                {/* Login Button */}
                <button
                    onClick={(e) => { handleSubmit(e) }}
                    className="w-full py-3 bg-[#E26003] text-white rounded-md hover:bg-orange-600 transition mb-4"
                >
                    {loading ? "Signing in" : "Sign up"}
                </button>

                <div className="text-center w-full flex justify-center items-center">
                    {/* OAuth Section */}
                    <button className="border-gray-400 border flex text-center items-center py-2 px-6 rounded-xl gap-6 tracking-wide font-semibold hover:bg-gray-200 hover:text-[#E26003] hover:font-medium">
                        <FcGoogle size={30} />
                        <span className="">Sign Up With Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;