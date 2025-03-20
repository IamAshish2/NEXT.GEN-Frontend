import {  axios_auth, axios_no_auth } from "@/global/config"
import { IUploadPostFromData } from "@/pages/layout/public/userPages/home-page-post/interface";
import { IUserData } from "@/pages/layout/public/userPages/profile/interface";

export const createPost = async (data:IUploadPostFromData) => {
    const res = await axios_no_auth.post('post/create-post',data);
    return res
}

// external api to get the user details : profile page of the user
export const getUserDetails = async(userName:string | undefined) : Promise<IUserData> => {
    const res = await axios_no_auth.get(`User/get-user-by-name/${userName}`);
    return res.data
}

export const getAllGroups = async() => {
    const res = await axios_no_auth.get('Groups/get-all-groups');
    return res.data
}