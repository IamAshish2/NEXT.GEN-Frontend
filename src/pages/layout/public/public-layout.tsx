import { Outlet } from "react-router-dom";
import Header from "../../../global/constants/header";
import { useHamburgerNavigation } from "@/global/constants/store";
import MobileNavigation from "./components/mobile-navigation";


const PublicLayout = () => {
    const { isOpen } = useHamburgerNavigation();

    return (
        <div className="flex flex-col items-center justify-between p-6 ">
            {/* Header styles for larger screens */}
            <div className="w-full mb-28">
                <Header />
            </div>

            <div className="rounded min-h-screen w-full">
                {isOpen ?
                    <MobileNavigation /> : (
                        <div>
                            <Outlet />
                        </div>
                    )}
            </div>
        </div>
    );
}

export default PublicLayout