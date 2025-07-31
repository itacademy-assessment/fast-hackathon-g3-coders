import { useGitHubSignInMutation } from "../query/authQueries";

export const LoginForm = () => {
    const gitHubSignInMutation = useGitHubSignInMutation();

    const handleGitHubSignIn = async () => {
        try {
            await gitHubSignInMutation.mutateAsync();
        } catch (error) {
            console.error("GitHub sign-in failed:", error);
        }
    };

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "400px",
                margin: "0 auto",
                padding: "24px",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            <div style={{ textAlign: "center" }}>
                <h2
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "24px",
                    }}
                >
                    Welcome Back
                </h2>
                <p
                    style={{
                        color: "#6b7280",
                        marginBottom: "32px",
                    }}
                >
                    Sign in with your GitHub account to continue
                </p>

                <button
                    onClick={handleGitHubSignIn}
                    disabled={gitHubSignInMutation.isPending}
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                        backgroundColor: gitHubSignInMutation.isPending
                            ? "#9ca3af"
                            : "#111827",
                        color: "white",
                        fontWeight: "500",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: gitHubSignInMutation.isPending
                            ? "not-allowed"
                            : "pointer",
                        transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        if (!gitHubSignInMutation.isPending) {
                            e.currentTarget.style.backgroundColor = "#1f2937";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!gitHubSignInMutation.isPending) {
                            e.currentTarget.style.backgroundColor = "#111827";
                        }
                    }}
                >
                    {gitHubSignInMutation.isPending ? (
                        <div
                            style={{
                                width: "20px",
                                height: "20px",
                                border: "2px solid white",
                                borderTop: "2px solid transparent",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite",
                            }}
                        />
                    ) : (
                        <>
                            <svg
                                style={{ width: "20px", height: "20px" }}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            Continue with GitHub
                        </>
                    )}
                </button>

                {gitHubSignInMutation.isError && (
                    <div
                        style={{
                            marginTop: "16px",
                            padding: "12px",
                            backgroundColor: "#fef2f2",
                            border: "1px solid #fecaca",
                            borderRadius: "6px",
                        }}
                    >
                        <p
                            style={{
                                color: "#dc2626",
                                fontSize: "0.875rem",
                                lineHeight: "1.4",
                            }}
                        >
                            {gitHubSignInMutation.error?.message ||
                                "Failed to sign in with GitHub. Please try again."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
