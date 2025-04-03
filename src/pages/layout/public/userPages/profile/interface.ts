import { AxiosResponse } from "axios"

export type IUserData = {
    fullName: string
    userName: string
    profilePicture:string
    course: string
    bio: string
    address: string
    email: string
    socials: string[],
    skills: string[],
    // stats
    stats: {
        posts: number 
        groups:number 
        connections: number 
    }
}

export interface IUserDataStore {
    data:IUserData,
    setData:(data:IUserData) => void,
    clearData:() => void,
    appendSkill: (skill:string) => void
    appendSocials: (social:string) => void

    showEditModal:boolean,
    setShowEditModal: (state:boolean) => void,

    getUserDetails: () => Promise<IUserData | null>,
    editUserDetails: (data:IUserData) => Promise<AxiosResponse | null>
}