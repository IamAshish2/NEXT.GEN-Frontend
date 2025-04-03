
export interface IAuthStore {
    isAuthenticated :boolean,
    setisAuthenticated: (isAuthenticated: boolean) => void
    authLoading: boolean;
    setAuthLoading: (authLoading: boolean) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
    checkAuth: () => Promise<IAuthRes | undefined>;
    // getProfile: () => Promise<IResponse>;

    getProfile: () => Promise<string | undefined>,
    // getAccessTokenFromRefreshToken: () => Promise<void>
}


 export type IAuthRes = {
    isLoggedIn: boolean
  };
  