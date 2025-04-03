import { create } from "zustand";
import { IGlobalStore, IUserData } from "./interface";
import { IToasterData } from "./components/toaster/interface";

export const useGlobalStore = create<IGlobalStore>((set) => ({
    user: {userName: ""},

    setUser: (data: IUserData ) => {
      set((state: IGlobalStore) => ({
        user: {
          ...state.user,
          ...data,
        },
      }));
    },
    
    // toaster
    toaster: {
    "message":"",
    severity: undefined,
    open: false
        },

    setToasterData: (data:IToasterData) => {
      set(() => ({
       toaster:{...data}
      }))},

    closeToasterData: () => {
      setTimeout(() => {
        set(() => ({
          toaster: {
            message:"",
            severity: undefined,
            open: false
                },
        }))
      },500);
    
    }
} 
))