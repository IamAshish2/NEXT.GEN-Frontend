import { create } from "zustand";
import { IUserData, IUserDataStore } from "./interface";
import { axios_auth } from "@/global/config";
import  { AxiosResponse } from "axios";

export const useUserProfileStore = create<IUserDataStore>((set) => ({
    data:{  userName: "", stats:{posts:0, groups:0, connections:0},  fullName: "", profilePicture:"", course: "",bio: "",address: "",email: "",socials: [],skills: []},

    setData: (data:IUserData) => {
        set((state:IUserDataStore) => ({
            data:{...state.data,...data}
        }))
    },

    clearData:() => {
        set({data:{  userName : "", stats:{posts:0, groups:0, connections:0},  fullName: "", profilePicture:"", course: "",bio: "",address: "",email: "",socials: [],skills: []},})
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
    getUserDetails: async() : Promise<IUserData | null> => {
        try {
            const res = await axios_auth.get(`User/get-user-by-name/`);
            return res.data

        } catch (error) {
            console.log(error);
            return null
        }
    },

    // edit/update the user details the user details
    editUserDetails: async (data:IUserData) : Promise<AxiosResponse | null> => {
        try {
            const res = await axios_auth.put(`User/update-user/`,data);
            console.log(res);
            
            return res.data
        } catch (error) {
            console.log(error);
            return null
        }
    }
}));
