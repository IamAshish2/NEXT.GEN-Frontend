export type IGroupDetailsData = {
    groupName: string,
    memberCount: string | number | undefined,
    description:string,
    category:string,
    groupImage: string,
    creatorName: string
}

export interface IGroupDetailsStore  {
    data: IGroupDetailsData,
    setData: (data:IGroupDetailsData) => void,
    clearData: () => void
}