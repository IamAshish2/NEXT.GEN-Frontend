import { create } from "zustand";
import { IGroupDetailsData, IGroupDetailsStore } from "./interface";

export const useGroupDetailsStore = create<IGroupDetailsStore>((set) => ({
    data:{groupName:"",memberCount:"",description:"",category:"",groupImage:"",creatorName:""},

    setData: (data:IGroupDetailsData) => {
        set((state:IGroupDetailsStore) => ({
            data:{...state.data,data}
        }))
    },
    clearData: () => {
        set({data:{groupName:"",memberCount:"",description:"",category:"",groupImage:"",creatorName:""}})
    }
}));