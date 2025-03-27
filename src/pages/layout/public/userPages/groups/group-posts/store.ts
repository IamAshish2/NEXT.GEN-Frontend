import { create } from "zustand";
import { ICommentData, ICommentStore } from "./interface";

export const useCreateCommentStore = create<ICommentStore>((set) => ({
    commentData: {content:"",postToCommentId: null, userName:""},

    setCommentData: (data:ICommentData) => {
        set((state:ICommentStore) => ({
            commentData:{...state.commentData,...data}
        }))
    },
    clearCommentData: () => {
        set({   commentData: {content:"",postToCommentId : null,userName:""}})
    }
}));