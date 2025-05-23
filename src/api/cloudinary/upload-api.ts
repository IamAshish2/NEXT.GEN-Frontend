import axios from "axios";


export const uploadImagesToCloudinary = async ( images: (File | string)[] ) => {
    const cloudName = import.meta.env.VITE_CLOUDNAME;
    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

    const cloudinaryURL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    try {
        const validImages = images?.filter(
            (image) => image instanceof Blob
        ) ?? [];

        const imageUrls = await Promise.all(
            validImages.map(async (image) => {
                const formData = new FormData();
                formData.append("file", image);
                formData.append("upload_preset", uploadPreset);

                const response = await axios.post(cloudinaryURL, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                return response.data.url;
            })
        );

        return imageUrls;
    } catch (err) {
        console.error("Error uploading images to Cloudinary:", err);
        return []; // Always return an array
    }
};


export const uploadImageToCloudinary = async (image: File | string) => {
    const cloudName = import.meta.env.VITE_CLOUDNAME;
    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

    const cloudinaryURL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    try{
        const formData = new FormData();
        formData.append('file',image);
        formData.append('upload_preset',uploadPreset);

        const response = await axios.post(cloudinaryURL, formData);
        return response.data.url;

    }catch(err){
        console.log("Error uploading to Cloudinary", err);
        return ""
    }
}
