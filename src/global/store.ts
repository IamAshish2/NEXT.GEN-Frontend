import { create } from "zustand";
import { IGlobalStore } from "./interface";
import { IToasterData } from "./components/toaster/interface";

export const useGlobalStore = create<IGlobalStore>((set) => ({
    user: {
          token: ""
        },
    setUser: (data: {token:string} ) => {
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
      set(() => ({
        toaster: {
          "message":"",
          severity: undefined,
          open: false
              },
      }))
    }
} 
))