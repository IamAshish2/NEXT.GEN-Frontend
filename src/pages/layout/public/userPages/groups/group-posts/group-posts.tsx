import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGroupDetailsStore } from "../store";
import { getGroupPosts, LikePost } from "@/api/api";
import { Bookmark, MessageCircle, MoreHorizontal, Share2, ThumbsUp } from "lucide-react";
import { userName } from "@/global/config";
import { ILikePostData } from "./interface";
import { useCreateCommentStore } from "./store";

const GroupPosts = () => {
    const params = useParams<string>();
    const { postData, setPostData } = useGroupDetailsStore();
    const { data, setData, clearData } = useCreateCommentStore();

    useEffect(() => {
        async function fetchGroupPosts() {
            const res = await getGroupPosts(params.name as string);
            if (res) {
                setPostData(res);
            }
        }

        fetchGroupPosts();
    }, [setPostData]);

    async function handleLike(postId: number) {
        const groupName = params.name;
        const data: ILikePostData = {
            postId,
            groupName: groupName as string,
            userName: userName as string
        }
        const res = await LikePost(data);
    }

    async function handleCommentClick() {
        setData({ ...data, isCommentClicked: !data.isCommentClicked })
    }

    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setData({ ...data, isCommentClicked: !data.isCommentClicked });
        console.log(data);

    }

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
            <article className="relative">
                <div className="max-w-2xl mx-auto">
                    {Array.isArray(postData) ? (
                        postData.map((post) => (
                            <div
                                key={post.postId}
                                className="mb-8 rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-gray-100 hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300"
                            >
                                <div className="flex items-center p-5">
                                    <div className="relative mr-3 group">
                                        <img
                                            src={post.imageUrls[0]}
                                            alt={post.title}
                                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white group-hover:ring-amber-400 transition-all duration-200"
                                        />
                                        <div className="absolute inset-0 bg-black/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>

                                    <div className="flex items-center  justify-between w-full">
                                        <div className="flex flex-col text-md mb-1">
                                            <Link
                                                to={`/user-groups/deatils/${params.name}`}
                                                className="font-medium text-orange-600 hover:text-amber-600"
                                            >
                                                {params.name}
                                            </Link>
                                            <div>
                                                <span className=" text-gray-300 text-sm"> • </span>
                                                <span className="text-gray-500 text-xs">
                                                    Posted by{" "}
                                                    <Link
                                                        to={`/u/${post.userName}`}
                                                        className="hover:text-amber-500 text-gray-900 transition-colors"
                                                    >
                                                        <span className="capitalize text-[#E26300] font-bold underline">{post.userName}</span>
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>

                                        <MoreHorizontal />

                                    </div>
                                </div>

                                <div className="px-5 pb-5">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2.5 leading-tight tracking-tight">
                                        {post.title}
                                    </h3>
                                    <div className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {post.description}
                                    </div>

                                    {Array.isArray(post.imageUrls) && post.imageUrls.length > 0 && (
                                        <div className="mb-4 overflow-hidden rounded-lg">
                                            <img
                                                src={post.imageUrls[0]}
                                                alt={post.title}
                                                className="w-full h-auto max-h-80 object-cover transform hover:scale-[1.02] transition-transform duration-500 ease-in-out"
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 pt-4 mt-2 border-t border-gray-50">
                                        <button
                                            onClick={() => { handleLike(post.postId as number) }}
                                            className={` flex items-center gap-1.5 text-sm  hover:text-amber-500 group transition-colors duration-200`}
                                        >
                                            <ThumbsUp
                                                size={18}
                                                className={` ${post.isLiked ? 'fill-[#E26300] text-[#E26300]' : ''} group-hover:scale-110 transition-transform`}
                                            />
                                            <span className="font-medium opacity-80 group-hover:opacity-100">{post.isLiked ? 'Liked' : 'Like'}</span>
                                        </button>

                                        <button onClick={handleCommentClick} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-amber-500 group transition-colors duration-200">
                                            <MessageCircle
                                                size={18}
                                                className="group-hover:scale-110 transition-transform"
                                            />
                                            <span className="font-medium opacity-80 group-hover:opacity-100">Comment</span>
                                        </button>

                                        <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-amber-500 group transition-colors duration-200">
                                            <Share2
                                                size={18}
                                                className="group-hover:scale-110 transition-transform"
                                            />
                                            <span className="font-medium opacity-80 group-hover:opacity-100">Share</span>
                                        </button>

                                        <button
                                            className="flex items-center gap-1.5 text-sm ml-auto text-gray-500 hover:text-amber-500 group transition-colors duration-200"
                                        >
                                            <Bookmark
                                                size={18}
                                                className="group-hover:scale-110 transition-transform"
                                            />
                                            <span className="font-medium opacity-80 group-hover:opacity-100">Save</span>
                                        </button>
                                    </div>

                                    {data.isCommentClicked && (
                                        <div className="w-full p-2 mt-3">
                                            <form onSubmit={handleSubmit} className="flex items-center gap-4" action="">
                                                <input onChange={(e) => { setData({ ...data, content: e.target.value }) }} type="text"
                                                    className="border w-full border-gray-400 rounded-lg h-12 p-4 " />

                                                <button type="submit" className="border p-2 rounded-lg text-white bg-[#E26300]">Comment</button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-24 px-6 rounded-xl bg-white shadow-sm ring-1 ring-gray-100 backdrop-blur-sm">
                            <div className="mb-5">
                                <div className="w-20 h-20 mx-auto rounded-full bg-gray-50 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">No posts yet</h3>
                            <p className="text-sm text-gray-500 max-w-xs mx-auto">This group doesn't have any content to display at the moment.</p>
                            <button className="mt-6 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium text-sm rounded-full transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2">
                                Create First Post
                            </button>
                        </div>
                    )}
                </div >
            </article >
        </div >


    );
};

export default GroupPosts;