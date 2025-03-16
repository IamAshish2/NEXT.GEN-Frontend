import { Clock, File, Images, Star, TrendingUp } from "lucide-react";
import PostCard from "./PostCard";

function CreatePost() {

    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* Feed Header - Removed hover effects */}
            <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-black">Your Feed</h2>
                        <p className="text-gray-500 text-sm">
                            Discover what's happening in your communities
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-xl bg-gray-50 text-gray-700">
                            <TrendingUp size={18} className="mr-2 inline-block" />
                            Hot
                        </button>
                        <button className="px-4 py-2 rounded-xl bg-gray-50 text-gray-700">
                            <Star size={18} className="mr-2 inline-block" />
                            Top
                        </button>
                        <button className="px-4 py-2 rounded-xl bg-gray-50 text-gray-700">
                            <Clock size={18} className="mr-2 inline-block" />
                            New
                        </button>
                    </div>
                </div>
            </div>

            {/* Create Post Card - Same as before */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6
                          transition-all duration-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <img
                        src="https://github.com/shadcn.png"
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-[#E26300]"
                    />
                    <button
                        className="flex-1 h-12 px-4 bg-gray-50 rounded-lg border border-gray-200
                              text-gray-500 hover:border-[#E26300] hover:bg-gray-50/50
                              transition-all text-left"
                        onClick={() => {/* Open create post modal */ }}
                    >
                        Create Post...
                    </button>
                    <div className="flex gap-2">
                        <button className="p-3 rounded-lg text-gray-500 hover:text-[#E26300] 
                                      hover:bg-[#E26300]/5 transition-colors">
                            <Images size={20} />
                        </button>
                        <button className="p-3 rounded-lg text-gray-500 hover:text-[#E26300] 
                                      hover:bg-[#E26300]/5 transition-colors">
                            <File size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <PostCard />
        </div >
    );
}

export default CreatePost