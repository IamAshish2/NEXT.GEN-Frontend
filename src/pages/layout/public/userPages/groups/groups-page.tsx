import { Link, useNavigate } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useGroupDetailsStore } from './store';
import { getAllGroups } from '@/api/api';
import { IGroupDetailsData } from './interface';

function Groups() {
    const navigate = useNavigate();
    /*
    const groups = [
        {
            id: 1,
            name: "Web Development Club",
            members: 1234,
            category: "Programming",
            description: "A community of web developers sharing knowledge and best practices",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
        },
        {
            id: 2,
            name: "Machine Learning Study Group",
            members: 856,
            category: "AI & Data Science",
            description: "Weekly discussions and practical implementations of ML algorithms",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
        },
        {
            id: 3,
            name: "UI/UX Design Workshop",
            members: 567,
            category: "Design",
            description: "Share and critique designs, discuss latest trends in UI/UX",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
        }
    ];*/

    const { data, setData } = useGroupDetailsStore();

    useEffect(() => {
        async function getGroupDetails() {
            const res = await getAllGroups();
            if (res) {
                setData(res);
            }
        }

        getGroupDetails();
    }, []);



    return (
        <div className="px-4 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 border-b border-gray-100 pb-6">
                <div className="mb-8">
                    <div className="flex items-baseline gap-3">
                        <h2 className="text-2xl font-semibold text-gray-900">Groups</h2>
                    </div>
                    <p className="text-gray-500 mt-1.5 text-sm font-normal">Discover communities or start your own</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center bg-gray-100 rounded-full pl-4 pr-2 py-2">
                        <input
                            type="text"
                            placeholder="Search groups..."
                            className="bg-transparent border-none focus:outline-none text-sm w-48"
                        />
                        <button className="p-1 hover:bg-gray-200 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </div>

                    <button
                        onClick={() => { navigate('/user/create-group') }}
                        className="px-6 py-2.5 bg-[#E26300] text-white rounded-full flex items-center gap-2 
                     hover:bg-black transition-colors duration-300 font-medium shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Create Group
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.isArray(data) && data.map((group: IGroupDetailsData) => (
                    <Link
                        key={group.groupName}
                        to={`/user-groups/details/${group.groupName}`}
                        className="ml-auto mr-auto bg-black rounded-xl border border-gray-800 overflow-hidden hover:shadow-lg 
               transition-shadow duration-200 w-full max-w-[20rem]"
                    >
                        <div className="h-32 overflow-hidden">
                            <img
                                src={group.groupImage}
                                alt='group'
                                className="w-full h-full object-cover brightness-75"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-white">{group.groupName}</h3>
                            </div>

                            <p className="text-sm text-[#E26300] mb-2">{group.category}</p>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">Created By{": "}
                                <span className="text-sm text-[#E26300] mb-2">{group.creatorName}</span>
                            </p>

                            <div className="flex justify-between items-center mt-2">
                                <span className="flex items-center text-sm text-gray-400">
                                    <Users size={16} className="mr-2 text-gray-500" />
                                    {group?.memberCount} members
                                </span>
                                <ArrowRight size={18} className="text-[#E26300]" />
                            </div>
                        </div>
                    </Link>
                ))}

                {/* {groups.map((group) => (
                    <Link
                        key={group.name}
                        to={`/user-groups/details/${group.name}`}
                        className="ml-auto mr-auto bg-black rounded-xl border border-gray-800 overflow-hidden hover:shadow-lg 
               transition-shadow duration-200 w-full max-w-[20rem]"
                    >
                        <div className="h-32 overflow-hidden">
                            <img
                                src={group.image}
                                alt='group'
                                className="w-full h-full object-cover brightness-75"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-white">{group.name}</h3>
                            </div>

                            <p className="text-sm text-[#E26300] mb-2">{group.category}</p>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{group.category}</p>

                            <div className="flex justify-between items-center mt-2">
                                <span className="flex items-center text-sm text-gray-400">
                                    <Users size={16} className="mr-2 text-gray-500" />
                                    {group?.members} members
                                </span>
                                <ArrowRight size={18} className="text-[#E26300]" />
                            </div>
                        </div>
                    </Link>
                ))} */}
            </div>
        </div>
    );
}

export default Groups;