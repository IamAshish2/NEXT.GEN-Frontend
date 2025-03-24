export type ILikePostData = {
    userName: string,
    groupName: string,
    postId: number
}

export type ICommentData = {
    content:string,
    isCommentClicked: boolean
}

export interface ICommentStore {
    data: ICommentData,
    setData: (data:ICommentData) => void,
    clearData: () => void
}