import { Outlet } from "react-router-dom";
import Header from "../../../global/constants/header";
import Footer from "../../../global/constants/footer";
import { useHamburgerNavigation } from "@/global/constants/store";
import MobileNavigation from "./components/mobile-navigation";


const PublicLayout = () => {
    const { isOpen } = useHamburgerNavigation();

    return (
        <div className="bg-black flex flex-col items-center justify-between p-6 ">
            {/* Header styles for larger screens */}
            <div className="w-full">
                <Header />
            </div>

            <div className="rounded min-h-screen w-full">
                {isOpen ?
                    <MobileNavigation /> : (
                        <div>
                            <Outlet />
                            {/* <Footer /> */}
                        </div>
                    )}
            </div>
        </div>
    );
}

export default PublicLayout