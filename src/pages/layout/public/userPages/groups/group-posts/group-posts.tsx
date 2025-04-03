import { useEffect, useState, useRef, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGroupDetailsStore } from "../store";
import { commentInPost, getGroupPosts, LikePost } from "@/api/api";
import { Bookmark, MessageCircle, MoreHorizontal, Share2, Heart, Send, X, Users, Clock } from "lucide-react";
import { userName } from "@/global/config";
import { ILikePostData } from "./interface";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import { Avatar, Tooltip, Skeleton, CircularProgress } from "@mui/material";
import { cn } from "@/lib/utils";
import { IGroupPostData } from "../interface";

const GroupPosts = () => {
    const params = useParams<string>();
    const { postData, setPostData, commentData, setCommentData, clearCommentData, addCommentToPost } = useGroupDetailsStore();
    const [loading, setLoading] = useState(true);
    const [activePostId, setActivePostId] = useState<number | null>(null);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [expandedPost, setExpandedPost] = useState<number | null>(null);
    const [likingInProgress, setLikingInProgress] = useState<number[]>([]);
    const commentInputRef = useRef<HTMLTextAreaElement>(null);
    const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
    const [sharableLink, setSharableLink] = useState("");
    const navigate = useNavigate();

    async function handleLike(postId: number) {
        if (likingInProgress.includes(postId)) return;

        setLikingInProgress(prev => [...prev, postId]);
        try {
            const groupName = params.name;
            const data: ILikePostData = {
                postId,
                groupName: groupName as string,
            };
            await LikePost(data);

            // Optimistic UI update
            setPostData(
                (postData as IGroupPostData[])?.map(post =>
                    post.postId === postId
                        ? {
                            ...post,
                            isLiked: !post.isLiked,
                            likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1
                        }
                        : post
                )
            );
        } catch (error) {
            console.error("Failed to like post:", error);
        } finally {
            setLikingInProgress(prev => prev.filter(id => id !== postId));
        }
    }

    async function handleCommentClick(postId: number) {
        setCommentData({ ...commentData, postToCommentId: postId });
        setActivePostId(postId);

        // Focus the comment input after a slight delay to ensure it's rendered
        setTimeout(() => {
            if (commentInputRef.current) {
                commentInputRef.current.focus();
            }
        }, 100);
    }

    async function handleCommentSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!commentData.content?.trim()) return;

        setIsCommentSubmitting(true);
        // add the comment to the comments[] array in  post 
        // Optimistic UI update for comments 
        addCommentToPost(commentData.postToCommentId as number, commentData);
        try {
            const data = {
                content: commentData.content,
                PostId: commentData.postToCommentId as number,
            };

            console.log(data);

            await commentInPost(data);

            clearCommentData();
            setActivePostId(null);
        } catch (error) {
            console.error("Failed to submit comment:", error);
        } finally {
            setIsCommentSubmitting(false);
        }
    }

    const handleShare = (postId: number) => {
        const post = (postData as IGroupPostData[]).find(p => p.postId === postId);
        if (!post) return;

        const baseUrl = window.location.origin;
        const shareUrl = `${baseUrl}/groups/${params.name}/post/${postId}`;
        setSharableLink(shareUrl);
        setShareDialogOpen(true);
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(sharableLink);
            // Show toast notification here
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const toggleExpandPost = (postId: number) => {
        setExpandedPost(expandedPost === postId ? null : postId);
    };

    // Controls for image carousel
    const nextImage = (post: IGroupPostData) => {
        if (!post.imageUrls || post.imageUrls.length <= 1) return;
        setCurrentImageIndex((prev) => (prev + 1) % post.imageUrls.length);
    };

    const prevImage = (post: IGroupPostData) => {
        if (!post.imageUrls || post.imageUrls.length <= 1) return;
        setCurrentImageIndex((prev) => (prev - 1 + post.imageUrls.length) % post.imageUrls.length);
    };

    const formatDate = (dateString: Date | string) => {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }

        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
        };

        return new Intl.DateTimeFormat("en-US", options).format(date); // You can change 'en-US' to other locale.
    };

    // Helper function to generate avatar string
    // const stringAvatar = (name: string) => {
    //     return {
    //         sx: {
    //             bgcolor: generateColorFromString(name),
    //         },
    //         children: name?.[0]?.toUpperCase() || '?',
    //     };
    // };

    // Generate a deterministic color from a string
    const generateColorFromString = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
        return `#${"00000".substring(0, 6 - c.length)}${c}`;
    };

    useEffect(() => {
        async function fetchGroupPosts() {
            setLoading(true);
            try {
                const res = await getGroupPosts(params.name as string);
                if (res) {
                    setPostData(res);
                }
            } catch (error) {
                console.error("Failed to fetch group posts:", error);
            } finally {
                setLoading(false);
            }

        }

        fetchGroupPosts();

        // Cleanup function
        return () => {
            clearCommentData();
        };
    }, [setPostData, params.name, clearCommentData]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <header className="mb-8">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                                    {params.name}
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                    <Users size={14} className="mr-1" />
                                    Community
                                </span>
                            </h1>

                            <button
                                onClick={() => { navigate(`/user-groups/${params.name}/post`) }}
                                className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                Create Post
                            </button>
                        </div>
                    </header>

                    {loading && (
                        // Material UI Skeleton loading state
                        <div className="space-y-6">
                            {[1, 2].map((i) => (
                                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 p-5 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Skeleton variant="circular" width={48} height={48} />
                                        <div className="space-y-2">
                                            <Skeleton variant="text" width={128} />
                                            <Skeleton variant="text" width={96} />
                                        </div>
                                    </div>
                                    <Skeleton variant="text" width="75%" height={20} />
                                    <Skeleton variant="text" width="100%" />
                                    <Skeleton variant="text" width="83%" />
                                    <Skeleton variant="rectangular" width="100%" height={192} style={{ borderRadius: "0.5rem" }} />
                                    <div className="flex justify-between pt-3">
                                        <Skeleton variant="rectangular" width={80} height={32} style={{ borderRadius: "0.5rem" }} />
                                        <Skeleton variant="rectangular" width={80} height={32} style={{ borderRadius: "0.5rem" }} />
                                        <Skeleton variant="rectangular" width={80} height={32} style={{ borderRadius: "0.5rem" }} />
                                        <Skeleton variant="rectangular" width={80} height={32} style={{ borderRadius: "0.5rem" }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {Array.isArray(postData) && postData.length > 0 ? (
                        <AnimatePresence>
                            <div className="space-y-8">
                                {postData.map((post, index) => (
                                    <motion.div
                                        key={post.postId}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.1,
                                            ease: [0.4, 0, 0.2, 1]
                                        }}
                                        className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300"
                                    >
                                        {/* Post Header */}
                                        <div className="p-5 flex items-center">
                                            <div className="relative group mr-3">
                                                {/* Material UI Avatar */}
                                                <div className="relative">
                                                    <Avatar
                                                        src={post.imageUrls?.[0] || undefined}
                                                        // src={stringAvatar(post.userName as string)}
                                                        alt={post.userName}
                                                        // {...(!post.imageUrls?.[0] ? stringAvatar(post?.userName) : {})}
                                                        sx={{
                                                            width: 48,
                                                            height: 48,
                                                            borderWidth: 2,
                                                            borderColor: 'white',
                                                            borderStyle: 'solid',
                                                            transition: '0.2s all',
                                                            '&:hover': {
                                                                borderColor: '#FCD34D'
                                                            }
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-black/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            to={`/user-groups/details/${params.name}`}
                                                            className="font-semibold text-gray-900 hover:text-amber-600 transition-colors"
                                                        >
                                                            {params.name}
                                                        </Link>

                                                        <div className="flex items-center text-xs text-gray-500">
                                                            <Clock size={12} className="mr-1 text-gray-400" />
                                                            {formatDate(post.postedDate)}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-500 mt-0.5">
                                                        <span>By </span>
                                                        <Link
                                                            to={`/u/${post.userName}`}
                                                            className="ml-1 font-medium text-orange-600 hover:text-amber-500 transition-colors"
                                                        >
                                                            {post.userName}
                                                        </Link>
                                                    </div>
                                                </div>

                                                {/* Material UI Tooltip */}
                                                <Tooltip title="More options" arrow>
                                                    <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>

                                        {/* Post Content */}
                                        <div className="px-5 pb-5">
                                            <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                                                {post.title}
                                            </h3>

                                            <div className={cn(
                                                "prose prose-orange prose-sm max-w-none text-gray-600 leading-relaxed mb-2",
                                                expandedPost !== post.postId && 'line-clamp-3'
                                            )}>
                                                {post.description}
                                            </div>

                                            {post.description && post.description.length > 150 && (
                                                <button
                                                    onClick={() => toggleExpandPost(post.postId as number)}
                                                    className={`text-sm font-medium text-amber-600 hover:text-amber-700 mb-4 focus:outline-none focus:underline  ${post.description.length < 500 ? 'hidden' : 'block'}`}
                                                >
                                                    {expandedPost == post.postId ? "Show less" : "Read more"}
                                                </button>
                                            )}

                                            {/* Post Image with carousel navigation */}
                                            {Array.isArray(post.imageUrls) && post.imageUrls.length > 0 && (
                                                <div className="relative mb-5 overflow-hidden rounded-lg bg-gray-50">
                                                    <div className="aspect-video relative">
                                                        <motion.img
                                                            key={`${post.postId}-${currentImageIndex}`}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            src={post.imageUrls[currentImageIndex]}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover"
                                                        />

                                                        {post.imageUrls.length > 1 && (
                                                            <>
                                                                <button
                                                                    onClick={() => prevImage(post)}
                                                                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                                                                    aria-label="Previous image"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <path d="M15 18l-6-6 6-6" />
                                                                    </svg>
                                                                </button>
                                                                <button
                                                                    onClick={() => nextImage(post)}
                                                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                                                                    aria-label="Next image"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <path d="M9 18l6-6-6-6" />
                                                                    </svg>
                                                                </button>

                                                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                                                                    {post.imageUrls.map((_, idx) => (
                                                                        <button
                                                                            key={idx}
                                                                            className={`w-2 h-2 rounded-full transitional ${idx === currentImageIndex ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/70'}`}
                                                                            onClick={() => setCurrentImageIndex(idx)}
                                                                        ></button>
                                                                    ))}
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Post Actions */}
                                            <div className="flex flex-col items-center gap-1 pt-4 mt-2 border-t border-gray-100">
                                                {post.comments.length > 0 &&
                                                    // , { state: post }
                                                    <button onClick={() => { navigate(`/view-user-post/${post.postId}`) }} className="text-sm underline text-[#E26300] w-full text-end hover:cursor-pointer"> View all comments <span className="">({post.comments.length})</span></button>
                                                }
                                                <div className="flex items-center items-start w-full">
                                                    {/* Material UI Tooltip for Like */}
                                                    <Tooltip title={post.isLiked ? 'Unlike this post' : 'Like this post'} arrow>
                                                        <button
                                                            onClick={() => handleLike(post.postId as number)}
                                                            disabled={likingInProgress.includes(post.postId as number)}
                                                            className={cn(
                                                                "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors relative group",
                                                                post.isLiked && "text-orange-600"
                                                            )}
                                                        >
                                                            <div className="relative">
                                                                {likingInProgress.includes(post.postId as number) ? (
                                                                    <CircularProgress size={20} thickness={5} color="inherit" />
                                                                ) : (
                                                                    <Heart
                                                                        size={20}
                                                                        className={cn(
                                                                            "group-hover:scale-110 transition-transform",
                                                                            post.isLiked && "fill-orange-600"
                                                                        )}
                                                                    />
                                                                )}
                                                            </div>
                                                            <span className="font-medium text-sm">
                                                                {post.likeCount > 0 && post.likeCount}
                                                                {post.isLiked ? ' Liked' : ' Like'}
                                                            </span>
                                                        </button>
                                                    </Tooltip>

                                                    {/* Material UI Tooltip for Comment */}
                                                    <Tooltip title="Comment on this post" arrow>
                                                        <button
                                                            onClick={() => handleCommentClick(post.postId as number)}
                                                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                                                        >
                                                            <MessageCircle
                                                                size={20}
                                                                className="group-hover:scale-110 transition-transform"
                                                            />
                                                            <span className="font-medium text-sm">Comment</span>
                                                        </button>
                                                    </Tooltip>

                                                    {/* Material UI Tooltip for Share */}
                                                    <Tooltip title="Share this post" arrow>
                                                        <button
                                                            onClick={() => handleShare(post.postId as number)}
                                                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                                                        >
                                                            <Share2
                                                                size={20}
                                                                className="group-hover:scale-110 transition-transform"
                                                            />
                                                            <span className="font-medium text-sm">Share</span>
                                                        </button>
                                                    </Tooltip>

                                                    <div>
                                                        <Tooltip title="Save this post" arrow>
                                                            <button
                                                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors ml-auto group"
                                                            >
                                                                <Bookmark
                                                                    size={20}
                                                                    className="group-hover:scale-110 transition-transform"
                                                                />
                                                                <span className="font-medium text-sm">Save</span>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>

                                            </div>

                                            {/* Comment Form */}
                                            <AnimatePresence>
                                                {activePostId === post.postId && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="mt-4 overflow-hidden"
                                                    >
                                                        <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3">
                                                            <div className="flex gap-3">
                                                                {/* Material UI Avatar for comment */}
                                                                <Avatar
                                                                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName}`}
                                                                // {...stringAvatar(userName as string)}
                                                                />

                                                                <div className="relative flex-1">
                                                                    <textarea
                                                                        ref={commentInputRef}
                                                                        value={commentData.content || ''}
                                                                        onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}
                                                                        placeholder="Write a comment..."
                                                                        className="w-full px-4 py-3 pr-12 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-400 resize-none min-h-[80px] outline-none transition-all"
                                                                    />
                                                                    <button
                                                                        type="submit"
                                                                        disabled={isCommentSubmitting || !commentData.content?.trim()}
                                                                        className="absolute bottom-3 right-3 text-orange-600 hover:text-orange-700 disabled:text-gray-300 disabled:pointer-events-none transition-colors"
                                                                        aria-label="Send comment"
                                                                    >
                                                                        {isCommentSubmitting ? (
                                                                            <CircularProgress size={18} thickness={5} color="inherit" />
                                                                        ) : (
                                                                            <Send size={18} />
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-end gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        clearCommentData();
                                                                        setActivePostId(null);
                                                                    }}
                                                                    className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    type="submit"
                                                                    disabled={isCommentSubmitting || !commentData.content?.trim()}
                                                                    className="px-4 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-md hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 disabled:pointer-events-none transition-all"
                                                                >
                                                                    {isCommentSubmitting ? 'Posting...' : 'Post Comment'}
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </AnimatePresence>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100 p-10 text-center"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                                    <svg className="w-12 h-12 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">No posts yet</h3>
                            <p className="text-gray-500 max-w-md mx-auto mb-8">
                                This community is waiting for its first post. Be the one to start the conversation and bring this group to life!
                            </p>
                            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2">
                                Create First Post
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Share Dialog */}
            <Transition appear show={shareDialogOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setShareDialogOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                                    <div className="absolute top-3 right-3">
                                        <button
                                            onClick={() => setShareDialogOpen(false)}
                                            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                        >
                                            <X size={18} className="text-gray-500" />
                                        </button>
                                    </div>

                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                        Share this post
                                    </Dialog.Title>

                                    <div className="mt-4 mb-6">
                                        <div className="flex mb-4">
                                            <input
                                                type="text"
                                                value={sharableLink}
                                                readOnly
                                                className="flex-1 p-3 text-sm border border-gray-300 rounded-l-lg bg-gray-50 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 outline-none"
                                            />
                                            <button
                                                onClick={copyToClipboard}
                                                className="px-4 bg-amber-500 text-white rounded-r-lg hover:bg-amber-600 transition-colors"
                                            >
                                                Copy
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-4 gap-3 mt-6">
                                            {[
                                                { name: 'Twitter', icon: 'twitter', color: 'bg-blue-400' },
                                                { name: 'Facebook', icon: 'facebook', color: 'bg-blue-600' },
                                                { name: 'LinkedIn', icon: 'linkedin', color: 'bg-blue-700' },
                                                { name: 'WhatsApp', icon: 'whatsapp', color: 'bg-green-500' },
                                            ].map((platform) => (
                                                <button
                                                    key={platform.name}
                                                    className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className={`w-10 h-10 rounded-full ${platform.color} flex items-center justify-center text-white mb-2`}>
                                                        <span className="sr-only">{platform.name}</span>
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-xs font-medium text-gray-700">{platform.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default GroupPosts;