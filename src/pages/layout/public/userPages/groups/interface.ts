export type IGroupDetailsData = {
    groupName: string,
    memberCount: string | number ,
    description:string,
    category:string,
    groupImage: string,
    creatorName: string
}

export interface IGroupDetailsStore  {
    data: IGroupDetailsData[] | IGroupDetailsData,
    setData: (data:IGroupDetailsData[]) => void,
    clearData: () => void
}