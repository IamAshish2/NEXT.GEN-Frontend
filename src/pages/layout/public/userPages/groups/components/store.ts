import { create } from "zustand";
import { ICreateGroupData, ICreateGroupDataStore } from "./interface";

export const useCreateGroupStore = create<ICreateGroupDataStore>((set) => ({
    data:{groupName:"",description:"", category:"",image:""},

    setData: (data:ICreateGroupData) => {
        set((state:ICreateGroupDataStore) => ({
            data:{...state.data,...data}
        }))
    },
    
    clearData: () => {
        set({data:{groupName:"",description:"",category:"",image:""}})
    }
}));