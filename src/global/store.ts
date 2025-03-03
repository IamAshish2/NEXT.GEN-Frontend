import { create } from "zustand";
import { IGlobalStore } from "./interface";

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
})
)