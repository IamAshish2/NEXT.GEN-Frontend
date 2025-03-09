import { BusinessName } from "../config";
import SocialIcons from "../components/social-icons";

const Footer = () => {
    return (
        <footer className=" text-gray-300 py-10 px-6 md:px-12 lg:px-20 border-t-2 border-gray-700">
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
            <div className="flex flex-col md:flex-row justify-between align-middle items-center px-4 py-4 gap-6">
                {/* Column 1 */}
                <div className="w-96 text-center md:text-start">
                    <h2 className="font-bold mb-4 text-3xl md:text-4xl">{BusinessName}</h2>
                    <p className="text-base text-gray-400">
                        Your next <span className=" text-[#E26003]">study</span> motivation that helps you meet like-minded learners with similar
                        {" "}<span className=" text-[#E26003]">interests</span> {""} , <span className=" text-[#E26003]">motivation</span> , <span className=" text-[#E26003]"></span> and <span className=" text-[#E26003]">expand</span> your reach.
                    </p>
                </div>

                <div className="md:w-72 md:flex md:flex-col md:justify-center md:items-center hidden">
                    <p className="text-2xl text-gray-300 font-semibold mb-4">Contact us on Socials</p>
                    <SocialIcons />
                </div>

                {/* Column 3 */}
                <div className="">
                    <h3 className="text-lg text-center font-bold text-gray-100 mb-4">
                        Stay Connected
                    </h3>
                    <form className="space-y-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition"
                        >
                            Subscribe
                        </button>
                    </form>

                    <div className="md:hidden w-80 flex justify-center items-center">
                        <SocialIcons />
                    </div>
                </div>
            </div>

            <div className="border-gray-700 mt-10 pt-6 md:flex md:justify-center md:items-center text-sm text-center">
                <p className="text-base md:text-sm ">
                    &copy; {new Date().getFullYear()} NEXT.GEN  All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;