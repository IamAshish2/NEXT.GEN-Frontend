export type ILikePostData = {
    userName: string,
    groupName: string,
    postId: number
}

// the type our backend is expecting when the user comments on a post
export type IPostCommentData = {
    userName: string,
    CommentText: string,
    PostId: number,
}


export type ICommentData = {
    content:string,
    postToCommentId: number | null,
    userName: string
}

export interface ICommentStore {
    commentData: ICommentData,
    setCommentData: (data:ICommentData) => void,
    clearCommentData: () => void
}