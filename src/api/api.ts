import {  axios_no_auth } from "@/global/config"
import { IUploadPostFromData } from "@/pages/layout/public/userPages/upload-post/components/interface";

export const createPost = async (data:IUploadPostFromData) => {
    const res = await axios_no_auth.post('post/create-post',data);
    return res
    
}