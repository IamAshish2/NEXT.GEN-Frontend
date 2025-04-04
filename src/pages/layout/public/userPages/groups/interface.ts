export type IGroupDetailsData = {
    groupName: string,
    memberCount: string | number ,
    description:string,
    category:string,
    groupImage: string,
    creatorName: string,
    hasJoined: boolean
}

export type ICommentData = {
    content:string,
    userName: string;
    postToCommentId: number | null,
}

// export interface ICommentStore {
//     commentData: ICommentData,
//     setCommentData: (data:ICommentData) => void,
//     clearCommentData: () => void
// }

export type IGroupPostData = {
    postId: number | undefined,
    title: string,
    userName: string,
    postedDate: Date,
    imageUrls : string [] ,
    description: string,
    isLiked: boolean,
    likeCount: boolean,
    comments: ICommentData[]
}

export interface IGroupDetailsStore  {
    data: IGroupDetailsData[] | IGroupDetailsData,
    setData: (data:IGroupDetailsData[]) => void,
    clearData: () => void,

    // data for post
    postData: IGroupPostData[] | IGroupPostData,
    setPostData: (postData: IGroupPostData[]) => void,
    clearPostData: () => void

    // // data for comment
    commentData: ICommentData,
    setCommentData: (data:ICommentData) => void,
    clearCommentData: () => void
    addCommentToPost: (postId: number | undefined | string, comment: ICommentData) => void;
}