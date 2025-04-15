import { RiLockPasswordLine } from "react-icons/ri";
import { ArrowRight } from "lucide-react";
import { AlertColor } from "@mui/material";
import { useGlobalStore } from "@/global/store";
import { useUpdatePasswordStore } from "./store";
import { useForgotPasswordStore } from "../forgot-password/store";
import { useSignInStore } from "../../login/store";
import { ForgotPasswordStep } from "@/global/enums";

const UpdatePasswordForm = () => {

    const { setToasterData } = useGlobalStore();
    const { email } = useForgotPasswordStore();
    const { setCurrentStep } = useSignInStore();
    const { data, setData, updatePassword, clearUpdatePasswordStoreData, loading, setLoading } = useUpdatePasswordStore();

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        setLoading(true);

        const payloadData = {
            email: email as string,
            newPassword: data?.password
        }

        const res = await updatePassword(payloadData);

        // for form validation
        if (res) {
            setToasterData({ message: res.message, severity: res.severity as AlertColor, open: true });
            clearUpdatePasswordStoreData();
        }

        setLoading(false);

        if (res.severity === "success") {
            setCurrentStep(ForgotPasswordStep.DEFAULT)
        }

    }


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
                        Change your password
                    </h1>
                </div>


                {/* Login Form */}
                <form className="space-y-5">

                    {/* Password Field */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <RiLockPasswordLine className="w-5 h-5 text-gray-400 
                                                                     group-focus-within:text-[#E26300] transition-colors" />
                            </div>
                            <input
                                type="password"
                                id="password"
                                value={data?.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 
                                                 rounded-xl text-gray-900 placeholder:text-gray-400 
                                                 focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                                 focus:border-[#E26300] transition-all"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <RiLockPasswordLine className="w-5 h-5 text-gray-400 
                                                                     group-focus-within:text-[#E26300] transition-colors" />
                            </div>
                            <input
                                type="password"
                                id="password"
                                value={data?.confirmPassword}
                                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
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
                                    <span>Updating Password...</span>
                                </>
                            ) : (
                                <>
                                    <span>Update Password</span>
                                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 
                                                                transition-transform" />
                                </>
                            )}
                        </span>
                    </button>
                </form>

            </div>
        </div>
    );
};
export default UpdatePasswordForm;