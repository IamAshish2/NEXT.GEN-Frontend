import { create } from "zustand";
import { IAuthStore } from "./auth-interface";
import { getUserProfile } from "@/api/api";
import { useGlobalStore } from "@/global/store";
import { AlertColor } from "@mui/material";
import { axios_auth } from "@/global/config";

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

    checkAuth: async () => {
        try {
            const res = await axios_auth.get(`Auth/check-auth`);
            if (res) {
                useAuthStore.getState().setIsLogin(res?.data?.isLogggedIn)
                return;
            }
        } catch (error) {
            useAuthStore.getState().setIsLogin(false)
            return undefined;
        }
    },

    getProfile: async () => {
        try {
            const res = await getUserProfile();
            if (res) {
                const user = useGlobalStore.getState().user;
                useGlobalStore.getState().setUser({
                    ...user,
                    userName: res.data.username
                })
            }
            if (res?.status === 200) {
                const path = window.location.pathname
                // useGlobalStore.getState().setToasterData({
                //     message: "Welcome back!",
                //     severity: "info" as AlertColor,
                //     open: true
                // })
                return path
            }

            if (res?.status == 401) {
                useGlobalStore.getState().setToasterData({
                    message: "You have been logged out. Please login again to continue!",
                    severity: "info" as AlertColor,
                    open: true
                })
                return '/'
            }

        } catch (error) {
            console.log(error);
        }
    }
}));
