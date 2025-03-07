import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";

const PublicLayout = () => {
    return (
        <div className="flex flex-col items-center justify-between p-6 ">
            {/* Header styles for larger screens */}
            <div className="sm:flex hidden">
                <Header />
            </div>

            <div>
                <Outlet />
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
}

export default PublicLayout