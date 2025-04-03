import { create } from "zustand";
import { IAuthStore } from "./auth-interface";
import { getUserProfile } from "@/api/api";
import { useGlobalStore } from "@/global/store";

export const useAuthStore = create<IAuthStore>((set) => ({
    isAuthenticated: false,
    setisAuthenticated: (isAuthenticated: boolean) => {
        set({ isAuthenticated: isAuthenticated })
    },

    authLoading: false,
    setAuthLoading: (authLoading: boolean) => {
        set({ authLoading: authLoading })
    },

    loading: false,
    setLoading: (loading: boolean) => {
        set({ loading: loading })
    },

    isLogin: false,
    setIsLogin: (isLogin: boolean) => {
        set({ isLogin: isLogin })
    },

    // checkAuth: async () => {
    //     try {

    //     } catch (error) {

    //     }
    // },

    getProfile: async () => {
        try {
            var res = await getUserProfile();

            const user = useGlobalStore.getState().user;
            useGlobalStore.getState().setUser({
                ...user,
                // res?.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}));
