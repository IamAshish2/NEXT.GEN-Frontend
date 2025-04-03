import { Users, Image } from 'lucide-react';
import { useCreateGroupStore } from './store';
import { uploadImageToCloudinary } from '@/api/cloudinary/upload-api';
import { axios_auth, axios_no_auth } from '@/global/config';
import { useNavigate } from 'react-router-dom';

export default function CreateGroupForm() {
    // add the file and category of the group to the data and the backend
    const { data, setData, clearData } = useCreateGroupStore();
    const navigate = useNavigate();


    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const image = e.target?.files?.[0];
        if (image) {
            setData({ ...data, image })
        }
    }

    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault();
        const imageUrl = await uploadImageToCloudinary(data.image);

        const queryData = {
            ...data,
            GroupImage: imageUrl,
        }
        const res = await axios_auth.post('/groups/create-group', queryData);
        if (res.status == 201) {
            navigate("/user-groups");
            clearData();
        }
    }

    return (
        <div className="ml-auto  mr-auto p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-800">
            <h2 className="text-2xl text-center mb-6">Create Study Group</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Group Name</label>
                    <input
                        type="text"
                        value={data.groupName as string}
                        onChange={(e) => { setData({ ...data, groupName: e.target.value }) }}
                        className="w-full px-4 py-4 border border-gray-600 rounded-lg focus:ring-2  focus:ring-orange-500 focus:outline-none"
                        placeholder="Enter group name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                    <textarea
                        onChange={(e) => { setData({ ...data, description: e.target.value }) }}
                        value={data.description as string}
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        rows={4}
                        placeholder="Describe your group"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <input
                        type="text"
                        value={data.category as string}
                        onChange={(e) => { setData({ ...data, category: e.target.value }) }}
                        className="w-full px-4 py-4 border border-gray-600 rounded-lg focus:ring-2  focus:ring-orange-500 focus:outline-none"
                        placeholder="Enter category of the group"
                    />
                </div>

                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-800 rounded-lg cursor-pointer">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Image className="mt-3 hover:scale-110 text-gray-400" size={30} />
                            <p className="pt-1 text-sm text-gray-500">
                                {"Drag and drop or click to select a file"}
                            </p>
                        </div>
                        <input
                            id="file"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>

                <div className='flex items-center justify-center'>
                    {
                        data.image &&
                        <img
                            className='h-60 w-60'
                            src={typeof data.image === 'string'
                                ? data.image
                                : URL.createObjectURL(data.image as File)
                            } />
                    }
                </div>


                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                    <Users size={20} />
                    Create Group
                </button>
            </form>
        </div>
    );
}