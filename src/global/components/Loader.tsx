import { PacmanLoader } from "react-spinners"
export default function Loader() {
    return (
        <div className="flex justify-center items-center flex-col min-h-screen">
            <PacmanLoader size={35} color="#E26003" />
        </div>
    )
}