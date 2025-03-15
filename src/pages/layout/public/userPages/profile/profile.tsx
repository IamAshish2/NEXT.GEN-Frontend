import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoPeopleOutline } from "react-icons/io5";

import { Mail, MapPin, Link as LinkIcon, Edit, Settings, Book, Users,} from 'lucide-react';

function Profile() {
    const user = {
        name: "Ashish Karki",
        title: "Computer Science Student",
        location: "San Francisco, CA",
        email: "alex.thompson@university.edu",
        website: "alexthompson.dev",
        bio: "Final year CS student passionate about web development and machine learning. Always eager to learn and collaborate on interesting projects.",
        skills: ["React", "TypeScript", "Python", "Machine Learning", "Node.js"],
        stats: {
            posts: 45,
            groups: 8,
            connections: 234
        },
        activities: [
            {
                id: 1,
                type: "post",
                title: "Implementing Authentication in React",
                engagement: "23 likes • 12 comments",
                time: "2 days ago"
            },
            {
                id: 2,
                type: "group",
                title: "Joined Machine Learning Study Group",
                engagement: "856 members",
                time: "1 week ago"
            }
        ]
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="rounded-xl overflow-hidden mb-6">
                <div className="h-32  mt-8"></div>
                <div className="px-6 pb-6">
                    <div className="flex justify-between items-start">
                        <div className="flex items-end -mt-12">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt={user.name}
                                className="w-24 h-24 rounded-xl border-4 border-orange-500"
                            />
                            <div className="ml-4 mb-2">
                                <h1 className="text-2xl font-bold">{user.name}</h1>
                                <p className="text-gray-600">{user.title}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2 pt-4">
                            <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-white hover:text-black flex items-center">
                                <Edit size={18} className="mr-2" />
                                Edit
                            </button>
                            <button className="p-2 rounded-lg border border-gray-300  hover:bg-white hover:text-black">
                                <Settings size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-600 mb-4">{user.bio}</p>
                            <div className="space-y-2">
                                <div className="flex items-center text-gray-600">
                                    <MapPin size={16} className="mr-2" />
                                    {user.location}
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Mail size={16} className="mr-2" />
                                    {user.email}
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <LinkIcon size={16} className="mr-2" />
                                    {user.website}
                                </div>
                            </div>
                            <div className="mt-4 flex space-x-3">
                                <button className="p-2 rounded-lg border border-gray-300  hover:bg-white hover:text-black">
                                    <FaGithub size={18} />
                                </button>
                                <button className="p-2 rounded-lg border border-gray-300 hover:bg-white hover:text-black">
                                    <FaSquareXTwitter size={18} />
                                </button>
                                <button className="p-2 rounded-lg border border-gray-300 hover:bg-white hover:text-black">
                                    <FaLinkedin size={18} />
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {user.skills.map(skill => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 border border-gray-800 hover:scale-110 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                                <div className="p-4 rounded-lg border border-gray-700 hover:scale-110">
                                    <Book size={20} className="mx-auto mb-2" />
                                    <div className="font-semibold">{user.stats.posts}</div>
                                    <div className="text-sm text-gray-500">Posts</div>
                                </div>
                                <div className="p-4 rounded-lg border border-gray-700 hover:scale-110">
                                    <Users size={20} className="mx-auto mb-2" />
                                    <div className="font-semibold">{user.stats.groups}</div>
                                    <div className="text-sm text-gray-500">Groups</div>
                                </div>
                                <div className="p-4 rounded-lg border border-gray-700 hover:scale-110">
                                    <IoPeopleOutline size={20} className="mx-auto mb-2" />
                                    <div className="font-semibold">{user.stats.connections}</div>
                                    <div className="text-sm text-gray-500">Connections</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity Feed */}
            <div className=" rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
                <div className="space-y-6">
                    {user.activities.map(activity => (
                        <div
                            key={activity.id}
                            className="flex items-start space-x-4 p-4 rounded-lg border hover:border-gray-300"
                        >
                            <div className="p-2 bg-gray-100 rounded-lg">
                                {activity.type === 'post' ? (
                                    <Book size={20} />
                                ) : (
                                    <Users size={20} />
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold">{activity.title}</h3>
                                <p className="text-sm text-gray-500">{activity.engagement}</p>
                                <p className="text-sm text-gray-400 mt-1">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;