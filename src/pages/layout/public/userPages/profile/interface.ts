import { AxiosResponse } from "axios"

export type IUserData = {
    fullName: string
    course: string
    bio: string
    address: string
    email: string
    socials: string[],
    skills: string[]
}

export interface IUserDataStore {
    data:IUserData,
    setData:(data:IUserData) => void,
    clearData:() => void,
    appendSkill: (skill:string) => void
    appendSocials: (social:string) => void

    showEditModal:boolean,
    setShowEditModal: (state:boolean) => void,

    getUserDetails: (userName:string | undefined) => Promise<IUserData | null>,
    editUserDetails: (userName:string,data:IUserData) => Promise<AxiosResponse | null>
}