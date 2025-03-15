export type ICreateGroupData = {
    groupName: string | FormDataEntryValue | null,
    description: string | FormDataEntryValue | null,
}

export interface ICreateGroupDataStore {
    data: ICreateGroupData,
    setData: (data:ICreateGroupData) => void,
    clearData: () => void
}