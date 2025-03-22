import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Bookmark, MessageCircle, Share2, ThumbsUp,
} from 'lucide-react';


const PostCard = ({ post }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(post.isBookmarked);

    return (
        <article
            className="relative bg-white rounded-xl border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-lg">

            {/* Post Header */}
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                    {/* Group Avatar & Info */}
                    <div className="relative group">
                        <img
                            src={`https://images.unsplash.com/photo-${post.id === 1 ? '1494790108377-be9c29b29330' : '1507003211169-0a1dd7228f2d'}`}
                            alt={post.groupName}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-100
                                     group-hover:border-[#E26300] transition-colors"
                        />
                        {/* Verified Badge if applicable */}
                        {post.isVerified && (
                            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                            <Link
                                to={`/g/${post.groupName}`}
                                className="text-sm font-semibold text-[#E26300] hover:underline"
                            >
                                g/{post.groupName}
                            </Link>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">
                                Posted by{" "}
                                <Link
                                    to={`/u/${post.author}`}
                                    className="hover:underline"
                                >
                                    u/{post.author}
                                </Link>
                            </span>
                        </div>
                        <span className="text-sm text-gray-500">{post.time}</span>
                    </div>
                </div>
                {!post.isMember && (
                    <button className="px-4 py-1.5 bg-[#E26300] text-white rounded-full 
                                     text-sm hover:bg-black transition-colors">
                        Join Group
                    </button>
                )}
            </div>

            {/* Post Content */}
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                </h3>
                <div className="text-gray-600 mb-4">
                    {post.content}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                        <Link
                            key={tag}
                            to={`/tag/${tag}`}
                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full 
                                     text-sm hover:bg-[#E26300]/10 hover:text-[#E26300] 
                                     transition-colors"
                        >
                            #{tag}
                        </Link>
                    ))}
                </div>

                {/* Post Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                    <button className="flex items-center gap-2 text-gray-500 
                                     hover:text-[#E26300] transition-colors group"
                        onClick={() => setIsLiked(!isLiked)}
                    >
                        <ThumbsUp
                            size={18}
                            className={`group-hover:scale-110 transition-transform
                                      ${isLiked ? 'fill-[#E26300] text-[#E26300]' : ''}`}
                        />
                        <span className="text-sm">{isLiked ? post.likes + 1 : post.likes} Likes</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 
                                     hover:text-[#E26300] transition-colors group">
                        <MessageCircle
                            size={18}
                            className="group-hover:scale-110 transition-transform"
                        />
                        <span className="text-sm">{post.comments} Comments</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 
                                     hover:text-[#E26300] transition-colors group">
                        <Share2
                            size={18}
                            className="group-hover:scale-110 transition-transform"
                        />
                        <span className="text-sm">Share</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 
                                     hover:text-[#E26300] transition-colors group ml-auto"
                        onClick={() => setIsSaved(!isSaved)}
                    >
                        <Bookmark
                            size={18}
                            className={`group-hover:scale-110 transition-transform
                                      ${isSaved ? 'fill-[#E26300] text-[#E26300]' : ''}`}
                        />
                        <span className="text-sm">Save</span>
                    </button>
                </div>
            </div>
        </article>
    );
};


const PostList = () => {
    const posts = [
        {
            id: 1,
            title: "Understanding React Hooks in Depth",
            author: "Sarah Chen",
            authorRole: "Senior Developer",
            category: "Web Development",
            groupName: "React Developers",
            isMember: true,
            content: "React Hooks have revolutionized how we write components. In this comprehensive guide, I'll break down the most important hooks and their practical applications in real-world scenarios...",
            likes: 234,
            comments: 45,
            shares: 12,
            time: "2h ago",
            trending: true,
            tags: ["react", "webdev", "javascript"],
            isBookmarked: false
        },
        {
            id: 2,
            title: "Machine Learning Fundamentals Study Group",
            author: "Alex Kumar",
            authorRole: "ML Engineer",
            category: "AI & ML",
            groupName: "AI Enthusiasts",
            isMember: false,
            content: "Looking for fellow students interested in forming a study group focused on machine learning fundamentals. We'll cover topics from basic statistics to advanced neural networks. All skill levels welcome!",
            likes: 156,
            comments: 32,
            shares: 8,
            time: "4h ago",
            trending: false,
            tags: ["machinelearning", "ai", "study"],
            isBookmarked: true
        }
    ];

    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;