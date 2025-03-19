import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoPeopleOutline } from "react-icons/io5";

import { Mail, MapPin, Link as LinkIcon, Edit, Settings, Book, Users, X, } from 'lucide-react';
import { useUserProfileStore } from "./store";
import { useParams } from "react-router-dom";

function Profile() {
    // const [user, setUser] = useState({
    //     name: "Ashish Karki",
    //     title: "Computer Science Student",
    //     location: "San Francisco, CA",
    //     email: "alex.thompson@university.edu",
    //     website: "alexthompson.dev",
    //     bio: "Final year CS student passionate about web development and machine learning. Always eager to learn and collaborate on interesting projects.",
    //     skills: ["React", "TypeScript", "Python", "Machine Learning", "Node.js"],
    //     socials: {
    //         github: "",
    //         linkedin: "",
    //         twitter: ""
    //     },
    //     stats: {
    //         posts: 45,
    //         groups: 8,
    //         connections: 234
    //     },
    //     activities: [
    //         {
    //             id: 1,
    //             type: "post",
    //             title: "Implementing Authentication in React",
    //             engagement: "23 likes • 12 comments",
    //             time: "2 days ago"
    //         },
    //         {
    //             id: 2,
    //             type: "group",
    //             title: "Joined Machine Learning Study Group",
    //             engagement: "856 members",
    //             time: "1 week ago"
    //         }
    //     ]
    // });

    // State for edit profile modal

    const [showEditModal, setShowEditModal] = useState(false);
    const skillRef = useRef<HTMLInputElement | null>(null);
    const socialsRef = useRef<HTMLInputElement | null>(null);
    const { data, setData, clearData, appendSkill, appendSocials, getUserDetails, editUserDetails } = useUserProfileStore();
    const { userName } = useParams();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    // Handle social links changes
    const addSocialLink = () => {
        if (socialsRef.current && socialsRef.current.value.trim() !== '') {
            appendSocials(socialsRef.current.value);
            socialsRef.current.value = ""
        }
    };

    const addSkill = () => {
        if (skillRef.current && skillRef.current.value.trim() !== '') {
            appendSkill(skillRef.current.value);
            skillRef.current.value = ""
        }
    }

    const removeSkill = () => {

    }

    useEffect(() => {
        async function fetchUserDetails() {
            const res = await getUserDetails("riya");
            // Filter out empty strings from socials and skills
            const filteredSocials = res?.socials.filter((link: string) => link.trim() !== '');
            const filteredSkills = res?.skills.filter((skill) => skill.trim() != '');

            //  if we do get an response set the userData to the response of the api call
            if (res) {
                setData({ ...res, socials: filteredSocials as string[], skills: filteredSkills as string[] });
            }
        }

        fetchUserDetails();

    }, []);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // user data in data from store

        const res = await editUserDetails('riya', data);
        if (res?.data == 204) {
            console.log('success');

        }


        setShowEditModal(false);
    };

    return (
        <div className={`${showEditModal ? 'bg-black' : 'bg-white'} max-w-4xl mx-auto`}>
            {/* Profile Header */}
            <div className="rounded-xl overflow-hidden mb-6">
                <div className="h-32 mt-8"></div>
                <div className="px-6 pb-6">
                    <div className="flex justify-between items-center h-24 w-full p-3">
                        <div className="flex items-end -mt-12">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                // alt={}
                                className="w-24 h-24 rounded-xl border-4 border-orange-500"
                            />
                            <div className="ml-4 mb-2 max-w-44">
                                <h1 className="text-2xl font-bold">{data.fullName}</h1>
                                <p className="text-gray-600">{data.course}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2 pt-4">
                            <button
                                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-white hover:text-black flex items-center"
                                onClick={() => setShowEditModal(true)}
                            >
                                <Edit size={18} className="mr-2" />
                                Edit
                            </button>
                            <button className="p-2 rounded-lg border border-gray-300 hover:bg-white hover:text-black">
                                <Settings size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-600 mb-4">{data.bio}</p>
                            <div className="space-y-2">
                                <div className="flex items-center text-gray-600">
                                    <MapPin size={16} className="mr-2" />
                                    {data.address}
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Mail size={16} className="mr-2" />
                                    {data.email}
                                </div>
                            </div>

                            {/* socials section */}
                            <div className="mt-4 flex space-x-3">
                                {data.socials.length > 0 && data.socials.map((link) => (
                                    <div key={link} className="flex items-center text-gray-600">
                                        <LinkIcon size={16} className="mr-2" />
                                        <p className="text-black">{link}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.length > 0 && data.skills[0] != '' && data.skills.map(skill => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 border border-gray-800 hover:scale-110 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            {/* user stats */}
                            {/* <div className="mt-6 grid grid-cols-3 gap-4 text-center">
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
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity Feed */}
            {/* <div className="rounded-xl p-6">
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
            </div> */}

            {/* Edit Profile Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black flex justify-center items-center z-50 p-4">
                    <div className=" border bg-white border-gray-300 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto ">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-semibold text-[#E26300]">Edit Profile</h2>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                {/* Basic Information */}
                                <div>
                                    {/* <h3 className="mb-4 text-gray-900 font-semibold underline">Basic Information</h3> */}
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block mb-1 text-sm font-medium">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={data.fullName}
                                                // onChange={handleInputChange}
                                                onChange={(e) => { setData({ ...data, fullName: e.target.value }) }}

                                                // className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                className="block w-full pl-3 pr-4 py-4 bg-gray-50 border border-gray-200 
                                                rounded-xl text-gray-900 placeholder:text-gray-400 
                                                focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                                focus:border-[#E26300] transition-all"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="title" className="block mb-1 text-sm font-medium">
                                                Course
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={data.course}
                                                onChange={(e) => { setData({ ...data, course: e.target.value }) }}
                                                // className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                className="block w-full pl-3 pr-4 py-4 bg-gray-50 border border-gray-200 
                                                rounded-xl text-gray-900 placeholder:text-gray-400 
                                                focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                                focus:border-[#E26300] transition-all"
                                            />
                                        </div>

                                        {/* <div>
                                            <label htmlFor="title" className="block mb-1 text-sm font-medium">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={data.address}
                                                onChange={(e) => { setData({ ...data, address: e.target.value }) }}
                                                // className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                className="block w-full pl-3 pr-4 py-4 bg-gray-50 border border-gray-200 
                                                rounded-xl text-gray-900 placeholder:text-gray-400 
                                                focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                                focus:border-[#E26300] transition-all"
                                            />
                                        </div> */}

                                        <div>
                                            <label htmlFor="bio" className="block mb-1 text-sm font-medium">
                                                Bio
                                            </label>
                                            <textarea
                                                id="bio"
                                                name="bio"
                                                value={data.bio}
                                                onChange={(e) => { setData({ ...data, bio: e.target.value }) }}
                                                rows={4}
                                                // className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                className="block w-full pl-3 pr-4 py-4 bg-gray-50 border border-gray-200 
                                                rounded-xl text-gray-900 placeholder:text-gray-400 
                                                focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                                focus:border-[#E26300] transition-all"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div>
                                    {/* <h3 className="font-semibold mb-4">Contact Information</h3> */}
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="location" className="block mb-1 text-sm font-medium">
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                id="location"
                                                name="location"
                                                value={data.address}
                                                onChange={(e) => { setData({ ...data, address: e.target.value }) }}
                                                // onChange={(e) => { setData({ ...data, address: e.target.value }) }}
                                                // className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                className="block w-full pl-3 pr-4 py-4 bg-gray-50 border border-gray-200 
                                                rounded-xl text-gray-900 placeholder:text-gray-400 
                                                focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                                focus:border-[#E26300] transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block mb-1 text-sm font-medium">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                                                // onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                                                // className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                className="block w-full pl-3 pr-4 py-4 bg-gray-50 border border-gray-200 
                                                rounded-xl text-gray-900 placeholder:text-gray-400 
                                                focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                                focus:border-[#E26300] transition-all"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="socials" className="block mb-1 text-sm font-medium">
                                                Socials
                                            </label>

                                            <div className="flex flex-col gap-2">
                                                <div className="flex gap-2">
                                                    <input
                                                        ref={socialsRef}
                                                        type="text"
                                                        name="socials"
                                                        className="block w-full pl-3 pr-4 py-2 bg-gray-50 border border-gray-200 
                                                rounded-xl text-gray-900 placeholder:text-gray-400 
                                                focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                                focus:border-[#E26300] transition-all" />

                                                    <button type='button' onClick={addSocialLink} className="border border-gray-300 rounded-lg font-semibold px-6 py-2 bg-[#E26300] text-white hover:bg-white hover:text-[#E26300]">Add</button>
                                                </div>
                                                {data.socials.length > 0 ?
                                                    (data.socials.map((s) => (
                                                        <p className="text-black" key={s}>{s}</p>
                                                    )))
                                                    : <p className="text-black">No socials added</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="skills" className="block mb-1 text-sm font-medium">
                                                Add skills
                                            </label>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        id="skills"
                                                        name="skills"
                                                        ref={skillRef}
                                                        className="block w-full pl-3 pr-4 py-2 bg-gray-50 border border-gray-200 
                                                rounded-xl text-gray-900 placeholder:text-gray-400 
                                                focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                                focus:border-[#E26300] transition-all"
                                                    />
                                                    <button type="button" onClick={addSkill} className="border border-gray-300 rounded-lg font-semibold px-6 py-2 bg-[#E26300] text-white hover:bg-white hover:text-[#E26300]">Add</button>
                                                </div>
                                                {data.skills ?
                                                    data.skills.map((s) => (
                                                        <p className="text-black" key={s}>{s}</p>
                                                    )) : <p className="text-black">No skills added</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="border mt-4 w-full py-3 rounded-md bg-[#E26300]
                            text-white border-gray-200 hover:bg-white hover:text-[#E26300] hover:border-gray-600">Save changes</button>
                        </form>
                    </div>
                </div >
            )
            }
        </div >
    )
}

export default Profile;