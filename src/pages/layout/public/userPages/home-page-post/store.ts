import { create } from "zustand";
import { IUploadPostFromData, IUploadPostFromDataStore } from "./interface";

export const useUploadPostStore = create<IUploadPostFromDataStore>((set) => ({
    data: {title:"",description:"",imageUrls:[]},
 
    setData: (data:IUploadPostFromData) => {
        set((state:IUploadPostFromDataStore) => ({
                data:{...state.data,...data}
        }))
    },

    clearForm: () => {
        set(() => ({
            data:{title:"",description:"", imageUrls:[]}
        }))
    },

    previewUrl: "",
    setPreviewUrl: (data:string | ArrayBuffer | null) => {
        // setting to some value
        set({previewUrl:data})
    }
}));