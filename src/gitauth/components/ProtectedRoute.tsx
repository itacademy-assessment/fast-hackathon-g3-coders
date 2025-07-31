import { Navigate } from "react-router-dom";
import { useAuthUserQuery } from "../auth/query/authQueries";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { data: user, isLoading } = useAuthUserQuery();

    // Show loading spinner while checking auth state
    if (isLoading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: "48px",
                        height: "48px",
                        border: "4px solid #f3f3f3",
                        borderTop: "4px solid #2563eb",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                    }}
                />
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Render protected content if authenticated
    return <>{children}</>;
};
