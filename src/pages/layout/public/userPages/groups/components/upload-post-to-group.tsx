import React, { useState } from 'react';
import { postToGroup } from '@/api/api';
import { Blob } from 'buffer';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadImagesToCloudinary } from '@/api/cloudinary/upload-api';
import { useUploadPostStore } from '../../home-page-post/store';

const UploadPostToGroup = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { name } = useParams();
    // state for keeping track of the images in the current time
    const [images, setImages] = useState<(File | string | Blob)[]>([]);
    const { data, setData, clearForm, previewUrl, setPreviewUrl } = useUploadPostStore();
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {

            // setData({ ...data, images: selectedFile });
            setImages((prev) => [...prev, selectedFile]);

            // Create preview URL for images
            if (selectedFile.type.startsWith('image/')) {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    setPreviewUrl(fileReader.result);
                };
                fileReader.readAsDataURL(selectedFile);
            } else {
                setPreviewUrl(null);
            }
        }
    };


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const userName = localStorage.getItem('userName');
            const url = await uploadImagesToCloudinary(images as File[]);

            const postData = {
                Title: data.title, Description: data.description, ImageUrls: url, UserName: userName as string, GroupName: name as string
            }

            const res = await postToGroup(postData);
            if (res == 204)
                navigate(`/user-groups/details/${name}`);

        } catch (error) {
            console.log(error);

        }
        clearForm();
    }
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[88vh] py-8 px-4">
            <div className="w-full max-w-md border rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6 text-center">Create New Post</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title *
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={data.title as string}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-800 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            placeholder="Enter post title"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            value={data.description as string}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            className="w-full px-4 py-2  border border-gray-800 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            placeholder="Write a description for your post"
                        />
                    </div>

                    <div>
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                            Upload File *
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-800 rounded-lg cursor-pointer">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mt-3 hover:scale-110 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <p className="pt-1 text-sm text-gray-500">
                                        {"Drag and drop or click to select a file"}
                                    </p>
                                </div>
                                <input
                                    id="file"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    required
                                />
                            </label>
                        </div>
                    </div>

                    {previewUrl && (
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 mb-1">Preview</p>
                            <div className="flex justify-center">
                                {images && images.length > 0 && images.map((image, idx) => (
                                    <img
                                        key={idx}
                                        // src={previewUrl as string}
                                        src={typeof image === 'string'
                                            ? image
                                            : URL.createObjectURL(image as File)
                                        }
                                        alt="Preview"
                                        className="max-h-48 rounded-lg object-contain"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full px-4 py-2 text-white font-medium rounded-md ${isSubmitting ? 'bg-blue-400' : 'bg-orange-600 hover:bg-white hover:text-orange-500'
                                } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors`}
                        >
                            {isSubmitting ? 'Uploading...' : 'Upload Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadPostToGroup;