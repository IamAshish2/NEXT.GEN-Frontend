import {   axios_no_auth } from "@/global/config"
import { IPostToGroupData } from "@/pages/layout/public/userPages/groups/components/interface";
import { ILikePostData } from "@/pages/layout/public/userPages/groups/group-posts/interface";
import { IUploadPostFromData } from "@/pages/layout/public/userPages/home-page-post/interface";
import { IUserData } from "@/pages/layout/public/userPages/profile/interface";
import { log } from "node:console";

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
/*
export const getGroupByName = async (groupName:string) => {
    const res = await axios_no_auth.get(`Groups/get-by-groupName/${groupName}`);
    return res.data;
}
 */

export const getGroupByName = async (groupName:string,userName:string) => {
    const res = await axios_no_auth.get(`Groups/get-by-groupName`,{
        params:{groupName,userName}
    });
    console.log(res);
    
    return res.data;
}

export const joinGroup  = async(groupName:string,userName:string) => {
    const res = await axios_no_auth.post(`GroupMember/join-group`,{GroupName:groupName,userName});
    return res.status;
}

export const postToGroup = async (data: IPostToGroupData) => {
    const res = await axios_no_auth.post(`Groups/upload-post-to-group`,data);
    return res.status;
}

export const getGroupPosts = async (groupName: string) => {
    const res = await axios_no_auth.get(`Post/get-all-group-posts/${groupName}`);
    if(res){
        return res.data;
    }
}

/* Like Post  */
export const LikePost = async(data:ILikePostData) => {
    const res = await axios_no_auth.post(`Like/like-post`,data);
    console.log(res);
    

}