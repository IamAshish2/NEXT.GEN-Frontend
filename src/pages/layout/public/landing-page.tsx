import Footer from '@/global/constants/footer';
import {
    ArrowRight,
    Search,
    Menu,
    X,
    ChevronRight,
    Clock,
    Star,
    Users,
    Terminal
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const courses = [
        {
            title: "Advanced System Design",
            badge: "Most Popular",
            level: "Advanced",
            duration: "12 weeks",
            enrolled: "2.8k students",
            rating: "4.9",
            icon: <Terminal className="w-6 h-6" />
        },
        {
            title: "Full-Stack Engineering",
            badge: "New",
            level: "Intermediate",
            duration: "10 weeks",
            enrolled: "1.5k students",
            rating: "4.8",
            icon: <Terminal className="w-6 h-6" />
        },
        {
            title: "Cloud Architecture",
            badge: "Trending",
            level: "Advanced",
            duration: "8 weeks",
            enrolled: "2.1k students",
            rating: "4.7",
            icon: <Terminal className="w-6 h-6" />
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <nav className="fixed w-full z-50 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-20 flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-black">
                                NEXT<span className="text-[#E26300]">.GEN</span>
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search communities, courses, discussions..."
                                    className="w-80 pl-12 pr-4 py-2 rounded-full bg-gray-50 border border-gray-200 
                                 focus:border-[#E26300] focus:outline-none focus:ring-1 focus:ring-[#E26300]"
                                />
                            </div>

                            {/* Navigation Links */}
                            <div className="flex items-center space-x-6">
                                <button className="text-gray-600 hover:text-[#E26300] transition-colors">
                                    Communities
                                </button>
                                <button className="text-gray-600 hover:text-[#E26300] transition-colors">
                                    Courses
                                </button>
                                <button className="text-gray-600 hover:text-[#E26300] transition-colors">
                                    Discussions
                                </button>
                                <button className="text-gray-600 hover:text-[#E26300] transition-colors">
                                    Resources
                                </button>
                            </div>

                            {/* Auth Buttons */}
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-6 py-2 text-gray-700 hover:text-[#E26300] transition-colors"
                                >
                                    Sign in
                                </button>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="px-6 py-2 bg-black text-white rounded-full 
                                 hover:bg-[#E26300] transition-colors"
                                >
                                    Join Community
                                </button>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden border-t border-gray-100 py-4">
                            <div className="space-y-4">
                                <div className="px-4">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="w-full pl-12 pr-4 py-2 rounded-full bg-gray-50 border border-gray-200"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {['Communities', 'Courses', 'Discussions', 'Resources'].map((item) => (
                                        <button
                                            key={item}
                                            className="block w-full px-4 py-2 text-left text-gray-600 hover:text-[#E26300] 
                                         hover:bg-gray-50 transition-colors"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                                <div className="px-4 space-y-2">
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="block w-full px-6 py-2 text-gray-700 hover:text-[#E26300] 
                                     transition-colors text-center"
                                    >
                                        Sign in
                                    </button>
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="block w-full px-6 py-2 bg-black text-white rounded-full 
                                     hover:bg-[#E26300] transition-colors text-center"
                                    >
                                        Join Community
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Live Stats Badge */}
                        <div className="inline-flex items-center bg-gray-50 rounded-full px-4 py-2 mb-8">
                            <div className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
                                <span className="text-sm text-gray-600 mr-2">Online now:</span>
                                <span className="text-sm font-medium">2,847 students</span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-sm text-gray-600">{new Date("2025-03-16 13:49:58").toLocaleTimeString()} UTC</span>
                            </div>
                        </div>

                        {/* Hero Title */}
                        <h1 className="text-5xl sm:text-6xl font-bold text-black mb-6 leading-tight">
                            Where students
                            <span className="text-[#E26300]"> learn together</span>
                            <br />
                            and grow together
                        </h1>

                        {/* Hero Description */}
                        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                            Join our vibrant community of learners. Share knowledge, collaborate on projects,
                            and accelerate your learning journey with like-minded peers.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={() => navigate('/signup')}
                                className="group px-8 py-4 bg-[#E26300] text-white rounded-full 
                             hover:bg-black transition-all duration-300"
                            >
                                Join the Community
                                <ArrowRight className="inline ml-2 w-4 h-4 transform 
                                        group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-4 text-black rounded-full border border-gray-200 
                                 hover:border-[#E26300] transition-colors"
                            >
                                Explore Discussions
                            </button>
                        </div>

                        {/* Community Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                            {[
                                { number: "50K+", label: "Active Students" },
                                { number: "1000+", label: "Daily Discussions" },
                                { number: "200+", label: "Study Groups" },
                                { number: "24/7", label: "Community Support" }
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl font-bold text-black mb-1">{stat.number}</div>
                                    <div className="text-sm text-gray-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Active Communities Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-black mb-4">Active Communities</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Join discussions, share knowledge, and connect with peers in your field
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Web Development",
                                members: "15.2K members",
                                topics: "2.1K topics",
                                activity: "Very Active",
                                description: "Frontend, Backend, DevOps, and everything in between"
                            },
                            {
                                name: "Data Science & AI",
                                members: "12.8K members",
                                topics: "1.8K topics",
                                activity: "Active",
                                description: "Machine Learning, Data Analysis, and AI applications"
                            },
                            {
                                name: "Mobile Development",
                                members: "10.5K members",
                                topics: "1.5K topics",
                                activity: "Very Active",
                                description: "iOS, Android, and Cross-platform development"
                            }
                        ].map((community, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-8 border border-gray-100 
                             hover:border-[#E26300] transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-black group-hover:text-[#E26300] 
                                         transition-colors">
                                            {community.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm mt-1">{community.description}</p>
                                    </div>
                                    <span className={`text-xs px-3 py-1 rounded-full 
                                     ${community.activity === 'Very Active'
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-blue-100 text-blue-600'}`}>
                                        {community.activity}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>{community.members}</span>
                                    <span>•</span>
                                    <span>{community.topics}</span>
                                </div>

                                <button className="mt-6 w-full py-2 border border-gray-200 rounded-lg text-gray-600
                                     hover:border-[#E26300] hover:text-[#E26300] transition-colors">
                                    Join Community
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-white text-black py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-8">
                        Ready to join our learning community?
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Connect with {parseInt(courses[0].enrolled)}+ students, join engaging discussions,
                        and accelerate your learning journey together.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-8 py-4 bg-[#E26300] rounded-full 
                         hover:bg-black hover:text-white transition-all duration-300"
                        >
                            Join Free Today
                        </button>
                        <button className="px-8 py-4 border border-white/20 rounded-full 
                             bg-black text-white hover:bg-black hover transition-all duration-300"
                        >
                            Browse Communities
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default LandingPage;