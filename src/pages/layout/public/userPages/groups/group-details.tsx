import { Link, useNavigate, useParams } from 'react-router-dom';
import { Users, Settings, MessageCircle, Calendar, Share2, Plus, Bell, ExternalLink, Clock, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useGroupDetailsStore } from './store';
import { getGroupByName, getGroupPosts, joinGroup } from '@/api/api';
import { IGroupDetailsData } from './interface';
import { userName } from '@/global/config';
import defaultProfile from "@/assets/guts.jpeg"
import { GroupTabs } from '@/global/enums';

function GroupDetails() {
    const { name } = useParams();
    const { data, setData, postData, setPostData } = useGroupDetailsStore();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<GroupTabs>(GroupTabs.DISCUSSIONS);


    const renderContent = () => {
        switch (activeTab) {
            case GroupTabs.DISCUSSIONS:
                return (
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <h2 className="text-lg font-semibold text-gray-900">Recent Discussions</h2>
                                <div className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-500">
                                    {postData.length}
                                </div>
                            </div>

                            {hasJoined &&
                                <button onClick={() => { navigate(`/user-groups/${groupName}/post`) }} className="flex items-center px-4 py-2 bg-black text-white rounded-full gap-2
   hover:bg-[#E26300] transition-colors">
                                    <Plus size={14} />
                                    <span className="text-xs font-medium">New Discussion</span>
                                </button>
                            }
                        </div>

                        <div className="space-y-4">
                            {postData.map((post, index) => (
                                <div
                                    key={index}
                                    className="p-5 rounded-xl border border-gray-200 hover:border-gray-300 bg-white transition-all duration-200"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="font-medium text-gray-900">{post.title}</h3>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
                                            {/* {post.postedDate} */}
                                            <Clock size={12} />
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4">{post.description}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            {/* <img
                      src={post.imageUrls[0]}
                      // alt={discussion.author}
                      className="w-6 h-6 rounded-full mr-2 border border-white shadow-sm"
                  /> */}

                                            <img
                                                src={defaultProfile}
                                                // alt={discussion.author}
                                                className="w-6 h-6 rounded-full mr-2 border border-white shadow-sm"
                                            />
                                            <span className="text-xs text-gray-500">{post.userName}</span>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center text-gray-500">
                                                <MessageCircle size={14} className="mr-1" />
                                                {/* <span className="text-xs">{discussion.replies}</span> */}
                                            </div>

                                            <a href="#" className="flex items-center text-xs text-[#E26300] font-medium hover:underline">
                                                View
                                                <ArrowRight size={12} className="ml-1" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 text-center">
                            <button className="inline-flex items-center px-4 py-2 text-sm border border-gray-200 rounded-lg
                   hover:border-[#E26300] hover:text-[#E26300] transition-colors">
                                View all discussions
                                <ExternalLink size={14} className="ml-2" />
                            </button>
                        </div>
                    </div>
                )

            case GroupTabs.EVENTS:
                return <div>Events Content</div>;
            case GroupTabs.RESOURCES:
                return <div>Resources Content</div>;
            case GroupTabs.MEMBERS:
                return <div>Members Content</div>;
            default:
                return <div>Discussions Content</div>;
        }
    };


    useEffect(() => {
        async function fetchGroup() {
            const res = await getGroupByName(name as string, userName as string);
            if (res) {
                setData(res);
            }
        }

        async function fetchGroupPosts() {
            const res = await getGroupPosts(name as string);
            if (res) {
                setPostData(res);
            }
        }
        fetchGroup();
        fetchGroupPosts();
    }, []);

    async function handleJoinGroup() {
        const res = await joinGroup(groupName, userName as string);
        if (res == 400) {
            return
        }
    }

    const { groupName, category, memberCount, description, groupImage, hasJoined } = data as IGroupDetailsData;


    const group = {
        id: 1,
        name: "Web Development Club",
        members: 1234,
        category: "Programming",
        description: "A community of web developers sharing knowledge and best practices. We focus on modern web technologies, frameworks, and best practices in web development.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=400&q=80",
        discussions: [
            {
                id: 1,
                author: "John Doe",
                title: "Best practices for React hooks",
                content: "What are your thoughts on custom hooks vs regular functions?",
                replies: 23,
                time: "2h ago",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            },
            {
                id: 2,
                author: "Jane Smith",
                title: "TypeScript configuration tips",
                content: "Share your TypeScript config setups and best practices",
                replies: 15,
                time: "5h ago",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
        ],
        isJoined: true,
        upcomingEvents: 2
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
            <nav className="flex py-4 text-sm text-gray-500" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-1">
                    <li><Link to="#" className="hover:text-[#E26300] transition-colors">Groups</Link></li>
                    <li className="flex items-center">
                        <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </li>
                    <li><span className="text-gray-800 font-medium">{groupName}</span></li>
                </ol>
            </nav>
            <div className="bg-black rounded-xl border border-gray-800 overflow-hidden mb-8 shadow-sm" >
                <div className="h-56 overflow-hidden relative">
                    <img
                        src={groupImage}
                        alt={groupImage}
                        className="w-full h-full object-cover brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

                    <div className="absolute top-4 right-4 flex space-x-2">
                        <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-[#E26300]/80 transition-colors"
                            aria-label="Share group">
                            <Share2 size={16} className="text-white" />
                        </button>
                        {group.isJoined && (
                            <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-[#E26300]/80 transition-colors"
                                aria-label="Notification settings">
                                <Bell size={16} className="text-white" />
                            </button>
                        )}
                        <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-[#E26300]/80 transition-colors"
                            aria-label="Group settings">
                            <Settings size={16} className="text-white" />
                        </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="inline-block px-3 py-1 bg-[#E26300] text-white text-xs font-medium 
                         rounded-full mb-3 tracking-wide">
                            {category}
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-white">{groupName}</h1>
                    </div>
                </div>

                <div className="p-5 sm:p-6">
                    <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">{description}</p>

                    <div className="flex flex-wrap gap-4 justify-between items-center">
                        <div className="grid grid-cols-3 gap-6 md:gap-8 mb-4 md:mb-0">
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                                    <Users size={14} className="text-[#E26300]" />
                                </div>
                                <div>
                                    <div className="text-white text-sm font-medium">{memberCount}</div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                                    <MessageCircle size={14} className="text-[#E26300]" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400">{postData.length} discussions</div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                                    <Calendar size={14} className="text-[#E26300]" />
                                </div>
                                <div>
                                    <div className="text-white text-sm font-medium">Jan 2024</div>
                                    <div className="text-xs text-gray-400">created</div>
                                </div>
                            </div>
                        </div>

                        {hasJoined ? (
                            <div className="flex items-center gap-3">
                                {group.upcomingEvents > 0 && (
                                    <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                                        {group.upcomingEvents} upcoming events
                                    </span>
                                )}


                                <button className="px-5 py-2 bg-gray-800 text-white rounded-full flex items-center gap-2 
                                 hover:bg-gray-700 transition-colors text-sm font-medium border border-gray-700">
                                    Joined
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        className="text-green-400">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </button>


                            </div>
                        ) : (
                            <button onClick={handleJoinGroup} className="px-3 py-2 bg-[#E26300] text-white rounded-full flex items-center gap-2 
                              hover:bg-[#c25600] transition-colors text-sm font-medium">
                                <Plus size={16} />
                                Join Group
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    {Object.values(GroupTabs).map((tabs, index) => (
                        <button key={index} onClick={() => {
                            setActiveTab(tabs)
                            renderContent()
                        }} className={`py-4 px-1 text-sm font-medium ${tabs == activeTab ? 'border-b-2 border-[#E26300] text-[#E26300]' : ''}`}>
                            {tabs}
                        </button>
                    ))}
                </nav>
            </div>

            {/* render dynamic content */}
            <div className="p-4 bg-white rounded-lg shadow-inner">
                {renderContent()}
            </div>
        </div >
    );
}

export default GroupDetails;