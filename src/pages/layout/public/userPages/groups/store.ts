import { create } from "zustand";
import { ICommentData, IGroupDetailsStore, IGroupPostData } from "./interface";

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
    },


      // for the comments
        commentData: {content:"",postToCommentId: null, userName:""},
      
          setCommentData: (data:ICommentData) => {
              set((state:IGroupDetailsStore) => ({
                  commentData:{...state.commentData,...data}
              }))
          },
          clearCommentData: () => {
              set({   commentData: {content:"",postToCommentId : null}})
          },

        addCommentToPost: (postId: number | undefined | string, comment: ICommentData) => {
          set((state:IGroupDetailsStore) => ({
            // map the post data and if the post Id matches then add the comment
            postData  : (state.postData as IGroupPostData[]).map((post) => 
                      post.postId === postId 
                      ? {
                          ...post,
                          comments: [...post.comments,comment]
                      }
                    : post
                      
                  )
          }))
        }

}));