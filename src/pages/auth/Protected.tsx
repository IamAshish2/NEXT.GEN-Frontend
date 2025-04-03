import { useEffect, ReactNode } from "react";
import { useAuthStore } from "./auth-store";
import { useNavigate } from "react-router-dom";

interface ProtectedProps {
    children: ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
    const { isLogin, checkAuth } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const checkIfAuthenticated = async () => {
            await checkAuth(); // Ensure auth state updates before rendering
        };
        checkIfAuthenticated();
    }, [checkAuth]); // ✅ Add dependency array to avoid infinite loops

    useEffect(() => {
        if (!isLogin) {
            navigate('/'); // ✅ Move inside useEffect to avoid navigation issues
        }
    }, [isLogin, navigate]); // ✅ Run only when isLogin changes

    if (!isLogin) return null; // ✅ Prevent UI from rendering before auth check completes

    return <>{children}</>;
};

export default Protected;
