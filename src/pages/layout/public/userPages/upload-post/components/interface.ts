export type IUploadPostFromData = {
    title: string | FormDataEntryValue | null,
    description: string | FormDataEntryValue | null,
    imageUrls: string[] ,
}

export interface IUploadPostFromDataStore {
    data:IUploadPostFromData,
    setData: (data:IUploadPostFromData) => void,
    clearForm : () => void,

    previewUrl: string | ArrayBuffer | null
    setPreviewUrl: (url:string | ArrayBuffer | null) => void,
}