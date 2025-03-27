import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { MessageCircle, MoreHorizontal, Send, X, ArrowLeft, ChevronLeft, Clock } from "lucide-react";
import { userName } from "@/global/config";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Avatar, CircularProgress, Tooltip } from "@mui/material";
import { useCreateCommentStore } from "../group-posts/store";
import { commentInPost, getCommentForPost } from "@/api/api";

const ViewPost = () => {
    const { clearCommentData, commentData, setCommentData } = useCreateCommentStore();
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state;
    const params = useParams<{ postId: string }>();
    const [loading, setLoading] = useState(false);
    const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
    const commentInputRef = useRef(null);

    useEffect(() => {
        // If post data wasn't passed via location state, we could fetch it here
        if (!post && params.postId) {
            setLoading(true);
            // Fetch post by ID could go here
            // For now, just redirect back if no post data
            navigate(-1);
        }

        // Cleanup function
        return () => {
            clearCommentData();
        };
    }, [post, params.postId, navigate,]); //clearCommentData

    // useEffect(() => {
    //     fetchComments();
    // }, []);

    // async function fetchComments() {
    //     const res = await getCommentForPost(post.postId);
    //     setPostData({ ...postData, comments: res });
    // }

    const formatDate = (dateString: string) => {
        if (!dateString || dateString === "0001-01-01T00:00:00") return "Recently";
        const date = new Date(dateString);
        return formatDistanceToNow(date, { addSuffix: true });
    };

    // // Generate a deterministic color from a string
    const generateColorFromString = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
        return `#${"00000".substring(0, 6 - c.length)}${c}`;
    };

    // Helper function for avatar
    const stringAvatar = (name: string) => {
        return {
            sx: {
                bgcolor: generateColorFromString(name),
            },
            children: name?.[0]?.toUpperCase() || '?',
        };
    };

    async function handleCommentSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!commentData.content?.trim()) return;

        setIsCommentSubmitting(true);
        try {
            const data = {
                CommentText: commentData.content,
                PostId: post.postId as number,
                userName: userName as string
            };

            await commentInPost(data);

            // Optimistic UI update for comments could be added here
            // if the API returns the updated comments

            clearCommentData();
        } catch (error) {
            console.error("Failed to submit comment:", error);
        } finally {
            setIsCommentSubmitting(false);
        }
    }


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50">
                <CircularProgress sx={{ color: '#f97316' }} />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                        <X size={32} className="text-orange-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Post Not Found</h1>
                    <p className="text-gray-600 mb-6">The post you're looking for could not be found.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                        <ChevronLeft size={18} className="mr-1" />
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Back button */}
                    <div className="mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            <span className="font-medium">Back to Posts</span>
                        </button>
                    </div>

                    {/* Comments Section */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 p-5 sm:p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <MessageCircle size={20} className="mr-2 text-amber-500" />
                            Comments ({post.comments.length})
                        </h2>

                        {/* New Comment Form */}
                        <form onSubmit={handleCommentSubmit} className="mb-8">
                            <div className="flex gap-3 mb-3">
                                <Avatar
                                    {...stringAvatar(userName as string)}
                                    sx={{ width: 40, height: 40 }}
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

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isCommentSubmitting || !commentData.content?.trim()}
                                    className={`${commentData.content.length > 0 ? "block" : "hidden"} px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-md hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 disabled:pointer-events-none transition-all`}
                                >
                                    {isCommentSubmitting ? 'Posting...' : 'Post Comment'}
                                </button>
                            </div>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-6">
                            {post.comments.length > 0 ? (
                                post.comments.map((comment, index) => (
                                    <motion.div
                                        key={comment.id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="flex gap-3"
                                    >
                                        <Avatar
                                            {...stringAvatar(comment.userName)}
                                            sx={{ width: 36, height: 36 }}
                                        />
                                        <div className="flex-1">
                                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 relative">
                                                <div className="absolute left-0 top-4 w-0 h-0 -ml-2 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-gray-50"></div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex flex-col">
                                                        <Link
                                                            to={`/u/${comment.userName}`}
                                                            className="font-semibold text-sm text-gray-900 hover:text-amber-600 transition-colors"
                                                        >
                                                            {comment.userName}
                                                        </Link>
                                                        <span className="text-xs text-gray-500">
                                                            {formatDate(comment.createdAt)}
                                                        </span>
                                                    </div>
                                                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors">
                                                        <MoreHorizontal size={14} />
                                                    </button>
                                                </div>
                                                <p className="text-gray-700 text-sm sm:text-base">
                                                    {comment.commentText}
                                                </p>
                                            </div>
                                            <div className="flex space-x-4 mt-1 ml-2">
                                                <button className="text-xs text-gray-500 hover:text-amber-600 transition-colors">
                                                    Like
                                                </button>
                                                <button
                                                    className="text-xs text-gray-500 hover:text-amber-600 transition-colors"
                                                    onClick={() => {
                                                        commentInputRef.current?.focus();
                                                        setCommentData({
                                                            ...commentData,
                                                            content: `@${comment.userName} `
                                                        });
                                                    }}
                                                >
                                                    Reply
                                                </button>
                                                <span className="text-xs text-gray-400">
                                                    {comment.likes || 0} likes
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 mx-auto bg-amber-50 rounded-full flex items-center justify-center mb-4">
                                        <MessageCircle size={24} className="text-amber-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">No comments yet</h3>
                                    <p className="text-gray-500 max-w-sm mx-auto">
                                        Be the first to share your thoughts on this post!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPost;