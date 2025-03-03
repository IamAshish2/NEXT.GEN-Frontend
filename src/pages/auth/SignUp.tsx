import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signUpSchema } from "./formValidation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = (data: SignUpFormData) => {
        console.log(data);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 text-gray-300 p-8 md:p-12 rounded-lg shadow-xl max-w-md w-full">
                <h1 className="text-3xl md:text-4xl font-bold text-[#E26003] text-center mb-6">
                    Sign Up
                </h1>

                {/* Email Field */}
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E26003]"
                    />
                </div>

                {/* Password Field */}
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Password
                    </label>
                    <input
                        {...register("password")}
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </div>

                {/* Confirm Password Field */}
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium mb-2"
                    >
                        Confirm Password
                    </label>
                    <input
                        {...register("confirmPassword")}
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
                    type="submit"
                    className="w-full py-3 bg-[#E26003] text-white rounded-md hover:bg-orange-600 transition mb-4"
                >
                    Sign Up
                </button>

                <div className="text-center w-full flex justify-center items-center">
                    {/* OAuth Section */}
                    <button className="border-gray-400 border flex text-center items-center py-2 px-6 rounded-xl gap-6 tracking-wide font-semibold hover:bg-gray-200 hover:text-[#E26003] hover:font-medium">
                        <FcGoogle size={30} />
                        <span className="">Sign Up With Google</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;