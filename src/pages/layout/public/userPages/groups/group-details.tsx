import { useParams } from 'react-router-dom';
import {
    Users,
    Settings,
    MessageCircle,
    Calendar,
    Share2,
    Plus
} from 'lucide-react';

function GroupDetails() {
    const { id } = useParams();

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
                time: "2h ago"
            },
            {
                id: 2,
                author: "Jane Smith",
                title: "TypeScript configuration tips",
                content: "Share your TypeScript config setups and best practices",
                replies: 15,
                time: "5h ago"
            }
        ]
    };

    return (
        <div>
            {/* Group Header */}
            <div className="bg-black rounded-xl border overflow-hidden mb-6 mt-12">
                <div className="h-48 overflow-hidden relative">
                    <img
                        src={group.image}
                        alt={group.name}
                        className="w-full h-full object-cover brightness-75"
                    />
                    <div className="absolute inset-0 bg-opacity-30"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h1 className="text-3xl text-center font-bold mb-2 text-gray-200">{group.name}</h1>

                    </div>
                </div>
                <div className="p-6 border-t border-gray-200">
                    <p className="text-gray-400 mb-2">{group.description}</p>
                    <div className=" justify-between">
                        <div className="space-x-6 grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <Users size={20} className="mr-2 text-gray-500" />
                                <span>{group.members} members</span>
                            </div>
                            <div className="flex items-center">
                                <MessageCircle size={20} className="mr-2 text-gray-500" />
                                <span>Active discussions</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar size={20} className="mr-2 text-gray-500" />
                                <span>Created Jan 2024</span>
                            </div>
                            <button className="px-4 py-2 bg-black text-white rounded-lg hover:scale-110 flex items-center">
                                <Plus size={18} className="mr-2" />
                                Join Group
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Discussions */}
            <div className=" rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Discussions</h2>
                    <button className="px-4 py-2 bg-black text-white rounded-lg hover:scale-110 flex items-center">
                        <Plus size={18} className="mr-2" />
                        New Discussion
                    </button>
                </div>

                <div className="space-y-6">
                    {group.discussions.map(discussion => (
                        <div
                            key={discussion.id}
                            className="p-4 rounded-lg border hover:border-gray-300"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{discussion.title}</h3>
                                <span className="text-sm text-gray-500">{discussion.time}</span>
                            </div>
                            <p className="text-gray-600 mb-4">{discussion.content}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt={discussion.author}
                                        className="w-6 h-6 rounded-full mr-2"
                                    />
                                    <span className="text-sm text-gray-500">{discussion.author}</span>
                                </div>
                                <div className="flex items-center text-gray-500">
                                    <MessageCircle size={16} className="mr-1" />
                                    <span className="text-sm">{discussion.replies} replies</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GroupDetails;