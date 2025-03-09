import navigation from "@/global/constants/navigation/mobile-navigation"
import { Link } from "react-router-dom"

const MobileNavigation = () => {
    return (
        <div className="flex items-center  justify-center bg-black overflow-hidden">
            <div className="h-screen w-full text-white brightness-75">
                <ol className="flex flex-col items-center h-full gap-7 mt-8">
                    {navigation.map(nav => (
                        <Link to={nav.to} key={nav.id}
                            className="hover:text-[#E26003] hover:brightness-100 hover:border-b-[1px] hover:border-[#E26003] hover:font-semibold cursor-pointer">
                            {nav.name}
                        </Link>
                    ))}
                    {/* a separate logout list for logging out a user in smaller screens */}
                    <li className="hover:text-[#E26003] hover:brightness-100 hover:border-b-[1px] hover:border-[#E26003] hover:font-semibold cursor-pointer">Log out</li>
                </ol>
            </div>
        </div>
    )
}

export default MobileNavigation