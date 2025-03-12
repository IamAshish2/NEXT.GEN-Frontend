import { ThumbsUp, MessageCircle, Share2, Bookmark, TrendingUp, Clock, Star, Images, File } from 'lucide-react';

function PostCard() {
    const posts = [
        {
            id: 1,
            title: "Understanding React Hooks in Depth",
            author: "Sarah Chen",
            category: "Web Development",
            content: "React Hooks have revolutionized how we write components. In this comprehensive guide, I'll break down the most important hooks and their practical applications in real-world scenarios...",
            likes: 234,
            comments: 45,
            time: "2h ago",
            trending: true
        },
        {
            id: 2,
            title: "Machine Learning Fundamentals Study Group",
            author: "Alex Kumar",
            category: "AI & ML",
            content: "Looking for fellow students interested in forming a study group focused on machine learning fundamentals. We'll cover topics from basic statistics to advanced neural networks. All skill levels welcome!",
            likes: 156,
            comments: 32,
            time: "4h ago",
            trending: false
        }
    ];

    return (
        <div className='bg-black sm:w-[40rem]'>
            {/* Content Header */}
            <div className="flex justify-between items-center mb-8 p-4">
                <h2 className="text-2xl font-bold text-orange-500">Your Feed</h2>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 rounded-lg border text-white border-gray-300 hover:bg-white hover:text-black flex items-center">
                        <TrendingUp size={18} className="mr-2" />
                        Trending
                    </button>
                    <button className="px-4 py-2 rounded-lg border text-white border-gray-300 hover:bg-white hover:text-black flex items-center">
                        <Clock size={18} className="mr-2" />
                        Latest
                    </button>
                </div>
            </div>

            {/* Create Post Section*/}
            <div className="ml-auto mr-auto  rounded-xl border border-gray-600 p-6 mb-6">
                <div className="flex items-center justify-center space-x-4 ">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Your profile"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                        <input
                            type='text'
                            placeholder="Share your thoughts or ask a question..."
                            className="w-full placeholder:text-center p-4 rounded-full border border-gray-400 text-white bg-black focus:outline-none focus:border-orange-500 focus:ring-1 resize-none"
                        />
                    </div>
                </div>
                <div className='flex items-center gap-10 ml-28 sm:ml-56 mt-3'>
                    <div className='flex gap-3 hover:scale-110 hover:cursor-pointer p-2 rounded-lg'>
                        <Images size={22} className='text-orange-500' />
                        <p className='text-white text-sm'>Gallery</p>
                    </div>

                    <div className='flex gap-3 hover:scale-110 hover:cursor-pointer p-2 rounded-lg'>
                        <File size={22} className='text-orange-500' />
                        <p className='text-white text-sm'>File</p>
                    </div>
                </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
                {posts.map(post => (
                    <article key={post.id} className="bg-black rounded-xl border text-zinc-100 border-gray-800 p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center">
                                <img
                                    src={`https://images.unsplash.com/photo-${post.id === 1 ? '1494790108377-be9c29b29330' : '1507003211169-0a1dd7228f2d'}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                    alt={post.author}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="ml-3">
                                    <h3 className="font-semibold">{post.author}</h3>
                                    <p className="text-sm text-gray-500">{post.time}</p>
                                </div>
                            </div>
                            {post.trending && (
                                <span className="flex items-center text-sm text-white">
                                    <Star size={16} className="mr-1" />
                                    Trending
                                </span>
                            )}
                        </div>

                        <div className="mt-4">
                            <h4 className="text-xl text-white font-semibold mb-2">{post.title}</h4>
                            <p className="text-gray-400">{post.content}</p>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex space-x-4">
                                <button className="flex items-center text-gray-100 hover:scale-110">
                                    <ThumbsUp size={18} className="mr-1" />
                                    {post.likes}
                                </button>
                                <button className="flex items-center text-gray-100 hover:scale-110">
                                    <MessageCircle size={18} className="mr-1" />
                                    {post.comments}
                                </button>
                                <button className="flex items-center text-gray-100 hover:scale-110">
                                    <Share2 size={18} />
                                </button>
                            </div>
                            <button className="text-gray-100 hover:scale-110">
                                <Bookmark size={18} />
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default PostCard;