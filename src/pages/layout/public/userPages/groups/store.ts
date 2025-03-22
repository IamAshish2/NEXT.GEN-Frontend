import { create } from "zustand";
import { IGroupDetailsStore, IGroupPostData } from "./interface";

export const useGroupDetailsStore = create<IGroupDetailsStore>((set) => ({
    /* i was initially doing it this way
    // data:{groupName:"",memberCount:"",description:"",category:"",groupImage:"",creatorName:""},

    // setData: (data:IGroupDetailsData) => {
    //     set((state:IGroupDetailsStore) => ({
    //         data:{...state.data,...data}
    //     }))
    // },
    // clearData: () => {
    //     set({data:{groupName:"",memberCount:"",description:"",category:"",groupImage:"",creatorName:""}})
    // }
    */

    data: [], // Initialize with an empty array
    setData: (data) => {
      set({ data }); // Directly set the array
    },
    clearData: () => {
      set({ data: [] });
    },


    //  for the group post data
    postData: [],
    setPostData: (postData: IGroupPostData[]) => {
      set({postData:postData})
    },

    clearPostData: () => {
      set({postData:[]})
    }

}));