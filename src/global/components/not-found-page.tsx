import notFound from "@/assets/notfound.jpg"
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-gray-800">
            <img
                src={notFound}
                alt="404 Not Found"
                className="w-96 h-auto mb-4 rounded-lg shadow-lg"
            />
            <h1 className="text-6xl font-bold text-white">404</h1>
            <p className="text-xl mt-2">Oops! The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                className="mt-6  text-white underline rounded-lg shadow-md hover:text-orange-500 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
}
