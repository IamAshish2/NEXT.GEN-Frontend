import {
    BookOpen,
    Users,
    Compass,
    Code,
    Palette,
    Music,
    Brain,
    ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const categories = [
        { icon: <Code className="w-6 h-6" />, name: 'Programming', count: '2.4k resources' },
        { icon: <Palette className="w-6 h-6" />, name: 'Design', count: '1.8k resources' },
        { icon: <Brain className="w-6 h-6" />, name: 'Data Science', count: '1.2k resources' },
        { icon: <Music className="w-6 h-6" />, name: 'Music', count: '950 resources' },
    ];

    const navigate = useNavigate();

    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="bg-black border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Compass className="w-8 h-8 text-orange-500" />
                            <span className="text-2xl font-bold text-white">NEXT.GEN</span>
                        </div>
                        <div className="flex space-x-6">
                            <button onClick={() => { navigate('/login') }} className="text-gray-300 hover:scale-110 hover:underline hover:text-orange-500">Sign In</button>
                            <button onClick={() => { navigate('/signup') }} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Learn, Connect, and Grow Together
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        Join a community of passionate learners. Access curated resources and connect
                        with peers who share your interests and career aspirations.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button onClick={() => { navigate('/signup') }} className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition flex items-center">
                            Start Learning <ChevronRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-black p-8 rounded-2xl border border-gray-700">
                        <div className=" w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                            <BookOpen className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Curated Learning Paths</h3>
                        <p className="">
                            Access carefully selected resources organized by topic. Follow structured
                            learning paths designed to take you from beginner to expert.
                        </p>
                    </div>
                    <div className="bg-black p-8 rounded-2xl border border-gray-700">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                            <Users className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Connect with Peers</h3>
                        <p className="text-gray-300">
                            Find and connect with other learners who share your interests. Build a
                            network that supports your growth and career development.
                        </p>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">
                    Explore Learning Categories
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, index) => (
                        <div key={index} className="bg-black p-6 rounded-xl border border-gray-700 hover:border-orange-500 transition cursor-pointer">
                            <div className="flex items-center space-x-4">
                                <div className="bg-black p-3 rounded-lg">
                                    {category.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">{category.name}</h3>
                                    <p className="text-sm text-gray-400">{category.count}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-black mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Start Your Learning Journey?
                        </h2>
                        <p className="text-orange-50 mb-8 max-w-2xl mx-auto">
                            Join thousands of learners already using next.gen to achieve their goals
                            and connect with like-minded peers.
                        </p>
                        <button onClick={() => { navigate('/signup') }} className="bg-orange-500 text-white sm:px-8 sm:py-4 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-white hover:text-orange-500 transition">
                            Create Free Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;