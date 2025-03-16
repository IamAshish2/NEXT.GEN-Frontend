import { BusinessName } from "../config";
import SocialIcons from "../components/social-icons";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-400 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Brand Column */}
                    <div className="md:col-span-5">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-black">
                                NEXT<span className="text-[#E26300]">.GEN</span>
                            </h2>
                            <p className="text-gray-600 leading-relaxed max-w-md">
                                Your next {""}
                                <span className="text-[#E26300]"> learning </span>{""}
                                journey begins here. Connect with{""}
                                <span className="text-[#E26300]"> passionate </span>{""}
                                learners, share
                                <span className="text-[#E26300]"> knowledge</span>, and{""}
                                <span className="text-[#E26300]"> grow </span>{""}
                                together.
                            </p>
                            
                            {/* Live Status */}
                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                                <span className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>{""}
                                    2,847 students online
                                </span>
                                <span className="text-gray-300">•</span>
                                <span>{new Date("2025-03-16 13:57:13").toLocaleTimeString()} UTC</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3">
                        <h3 className="text-black font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            {['Communities', 'Courses', 'Discussions', 'Resources', 'Help Center'].map((item) => (
                                <li key={item}>
                                    <button className="text-gray-500 hover:text-[#E26300] transition-colors">
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Column */}
                    <div className="md:col-span-4">
                        <div className="space-y-6">
                            <h3 className="text-black font-semibold">Stay Connected</h3>
                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                                                 text-gray-900 placeholder-gray-500 focus:outline-none 
                                                 focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300]
                                                 transition-colors"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-3 bg-black text-white rounded-lg
                                             hover:bg-[#E26300] transition-colors"
                                >
                                    Subscribe to Newsletter
                                </button>
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <h4 className="text-sm text-gray-600 mb-4">Follow us on social media</h4>
                                <div className="flex space-x-4">
                                    <SocialIcons />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-500">
                            &copy; {new Date().getFullYear()} learnHub. All rights reserved.
                        </div>
                        
                        {/* Bottom Links */}
                        <div className="flex items-center space-x-6">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
                                <button 
                                    key={item}
                                    className="text-sm text-gray-500 hover:text-[#E26300] transition-colors"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;