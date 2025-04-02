
export interface IAuthStore {
    isAuthenticated :boolean,
    setisAuthenticated: (isAuthenticated: boolean) => void
    authLoading: boolean;
    setAuthLoading: (authLoading: boolean) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;

    // checkAuth: () => Promise<IAuthRes | null>;
    // getProfile: () => Promise<IResponse>;

    getProfile: () => Promise<void>,
    // getAccessTokenFromRefreshToken: () => Promise<void>
}


 export type IAuthRes = {
 userName:string;
  };
  