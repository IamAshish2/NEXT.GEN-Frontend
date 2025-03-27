export type IGroupDetailsData = {
    groupName: string,
    memberCount: string | number ,
    description:string,
    category:string,
    groupImage: string,
    creatorName: string,
    hasJoined: boolean
}

export type IGroupPostData = {
    postId: number | undefined,
    title: string,
    userName: string,
    postedDate: Date,
    imageUrls : string [] ,
    description: string,
    isLiked: boolean,
    likeCount: boolean,
    comments: string[]
}

export interface IGroupDetailsStore  {
    data: IGroupDetailsData[] | IGroupDetailsData,
    setData: (data:IGroupDetailsData[]) => void,
    clearData: () => void,

    // data for post
    postData: IGroupPostData[],
    setPostData: (postData: IGroupPostData[]) => void,
    clearPostData: () => void
}