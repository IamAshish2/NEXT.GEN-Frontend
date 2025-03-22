export type ICreateGroupData = {
    groupName: string | FormDataEntryValue | null,
    description: string | FormDataEntryValue | null,
    category: string,
    image: string | File
}

export interface ICreateGroupDataStore {
    data: ICreateGroupData,
    setData: (data:ICreateGroupData) => void,
    clearData: () => void
}

export type IPostToGroupData = {
    Title: string | FormDataEntryValue | null,
    Description: string | FormDataEntryValue | null,
    ImageUrls: string[] ,
    UserName: string,
    GroupName: string
}