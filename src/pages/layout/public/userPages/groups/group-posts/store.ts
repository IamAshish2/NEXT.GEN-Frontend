import { create } from "zustand";
import { ICommentData, ICommentStore } from "./interface";

export const useCreateCommentStore = create<ICommentStore>((set) => ({
    data: {content:"",isCommentClicked:false},

    setData: (data:ICommentData) => {
        set((state:ICommentStore) => ({
            data:{...state.data,...data}
        }))
    },
    clearData: () => {
        set({   data: {content:"",isCommentClicked:false}})
    }
}));