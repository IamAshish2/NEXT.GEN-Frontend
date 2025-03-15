import { MessageCircle, UserPlus, Search, MoreHorizontal, MapPin } from 'lucide-react';

export function FriendsPage() {
    const friends = [
        {
            id: 1,
            name: "Alex Johnson",
            major: "Computer Science",
            location: "San Francisco, CA",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            online: true,
            mutualFriends: 12
        },
        {
            id: 2,
            name: "Sarah Williams",
            major: "Mathematics",
            location: "Boston, MA",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            online: false,
            mutualFriends: 8
        },
        {
            id: 3,
            name: "Michael Brown",
            major: "Physics",
            location: "New York, NY",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            online: true,
            mutualFriends: 15
        }
    ];

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Add People</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search people..."
                        className="pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {friends.map((friend) => (
                    <div key={friend.id} className="bg-black border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                        {/* Card Header */}
                        <div className="relative p-4 flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img
                                        src={friend.avatar}
                                        alt={friend.name}
                                        className="w-16 h-16 rounded-full object-cover ring-2 ring-white"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{friend.name}</h3>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <MapPin size={14} className="mr-1" />
                                        {friend.location}
                                    </div>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className="px-4 pb-2">
                            <div className="text-sm text-gray-600">
                                <p className="font-medium">{friend.major} major</p>
                                <p className="text-gray-400 text-xs mt-1">{friend.mutualFriends} mutual connections</p>
                            </div>
                        </div>

                        {/* Card Actions */}
                        <div className="px-4 pb-4 pt-2 flex gap-2">
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 font-medium">
                                <UserPlus size={18} />
                                Connect
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium">
                                <MessageCircle size={18} />
                                Message
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}