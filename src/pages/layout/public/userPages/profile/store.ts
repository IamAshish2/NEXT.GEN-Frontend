import { create } from "zustand";
import { IUserData, IUserDataStore } from "./interface";
import { axios_auth, axios_auth_form, axios_no_auth } from "@/global/config";
import { log } from "console";
import axios, { AxiosResponse, HttpStatusCode } from "axios";

export const useUserProfileStore = create<IUserDataStore>((set) => ({
    data:{  fullName: "", course: "",bio: "",address: "",email: "",socials: [],skills: []},

    setData: (data:IUserData) => {
        set((state:IUserDataStore) => ({
            data:{...state.data,...data}
        }))
    },

    clearData:() => {
        set({data:{  fullName: "", course: "",bio: "",address: "",email: "",socials: [],skills: []},})
    },

    appendSkill: (skill:string) => {
        set((state:IUserDataStore) => ({
            data: {
                ...state.data,
                skills:[...state.data.skills,skill]
            }
        }))
    },

    appendSocials: (social:string) => {
        set((state:IUserDataStore) => ({
            data:{
                ...state.data,
                socials:[...state.data.socials, social]
            }
        }))
    },



    // state for edit modal popup
    showEditModal:false,
    setShowEditModal:(newState:boolean) => {
        set({showEditModal:newState})
    },


    // hit the https://localhost:7172/api/User/get-user-by-name/{userName} api
    getUserDetails: async(userName:string | undefined) : Promise<IUserData | null> => {
        try {
            const res = await axios_no_auth.get(`User/get-user-by-name/${userName}`);
         
            return res.data

        } catch (error) {
            console.log(error);
            return null
        }
    },

    // edit/update the user details the user details
    editUserDetails: async (userName:string,data:IUserData) : Promise<AxiosResponse | null> => {
        try {
            const res = await axios_no_auth.put(`User/update-user/${userName}`,data);
            console.log(res.data);
            
            return res.data
        } catch (error) {
            console.log(error);
            return null
        }
    }
}));
