import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { LoginClass } from "./helper";
import { useSignInStore } from "./store";
import { ISignInData, ISignInStore } from "./interface";
import { IGlobalStore } from "../../../global/interface";
import { useGlobalStore } from "../../../global/store";

const Login = () => {

    const navigate = useNavigate();

    const loginClass = useMemo(() => new LoginClass(), []);

    // store
    const setData = useSignInStore((state: ISignInStore) => state.setSignInData);
    const data: ISignInData = useSignInStore((state: ISignInStore) => state.signInData);
    const clearData = useSignInStore((state: ISignInStore) => state.clearSignInData);
    const setDataError = useSignInStore((state: ISignInStore) => state.setSignInDataError);
    const clearDataError = useSignInStore((state: ISignInStore) => state.clearSignInDataError);

    const loginUser = useSignInStore((state: ISignInStore) => state.signIn);
    const user = useGlobalStore((state: IGlobalStore) => state.user);
    const setUser = useGlobalStore((state: IGlobalStore) => state.setUser);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
            navigate("/home");
        }
    }, [user, navigate])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black">
            <form className="bg-gray-900 text-gray-300 p-8 md:p-12 rounded-lg shadow-xl max-w-md w-full">
                <h1 className="text-3xl md:text-4xl font-bold text-[#E26003] text-center mb-6">
                    Login
                </h1>

                {/* Email Field */}
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                    </label>
                    <input
                        value={data?.email as string}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E26003]"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="userName" className="block text-sm font-medium mb-2">
                        User Name
                    </label>
                    <input
                        value={data.userName}
                        onChange={(e) => setData({ ...data, userName: e.target.value })}
                        type="text"
                        id="userName"
                        placeholder="Enter your UserName"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E26003]"
                    />
                </div>

                {/* Password Field */}
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Password
                    </label>
                    <input
                        value={data?.password as string}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        // {...register("password")}
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </div>

                <div className="mt-6 text-center mb-3">
                    <button
                        className="text-sm text-gray-200"
                    >
                        Don't have an Account ?  {""}
                        <Link to="/" className="text-gray-400  hover:underline hover:cursor-pointer underline hover:text-white">Sign Up</Link>
                    </button>
                </div>

                {/* Login Button */}
                <button
                    onClick={(e) => { handleSubmit(e) }}
                    className="w-full py-3 bg-[#E26003] text-white rounded-md hover:bg-orange-600 transition mb-2"
                >
                    Login
                </button>

                {/* forgot password section */}
                <div className="flex items-center justify-center mb-2">
                    <p className="text-gray-400 text-center underline text-sm hover:text-white w-40 mb-4">Forgot Password ?</p>
                </div>

                <div className="text-center w-full flex justify-center items-center">
                    {/* OAuth Section */}
                    <button className="border-gray-400 border flex text-center items-center py-2 px-6 rounded-xl gap-6 tracking-wide font-semibold hover:bg-gray-200 hover:text-[#E26003] hover:font-medium">
                        <FcGoogle size={30} />
                        <span className="">Login With Google</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;