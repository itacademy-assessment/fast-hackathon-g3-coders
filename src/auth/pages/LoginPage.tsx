import { Navigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { useAuthUserQuery } from "../query/authQueries";

export const LoginPage = () => {
    const { data: user, isLoading } = useAuthUserQuery();
    const isLogged = !!user;

    // Show loading while checking auth state
    if (isLoading) {
        return (
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: "40px",
                        height: "40px",
                        border: "4px solid #f3f3f3",
                        borderTop: "4px solid #3498db",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                    }}
                />
            </div>
        );
    }

    return (
        <>
            {isLogged && <Navigate to="/" replace={true} />}
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                    backgroundColor: "#f8f9fa",
                }}
            >
                <h1
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        background:
                            "linear-gradient(to top left, #1e3a8a, #3b82f6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textAlign: "center",
                        marginBottom: "40px",
                    }}
                >
                    Login to your account
                </h1>
                <LoginForm />
            </div>
        </>
    );
};
