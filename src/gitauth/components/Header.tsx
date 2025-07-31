import {
    useAuthUserQuery,
    useEnhancedUserQuery,
    useSignOutMutation,
} from "../auth/query/authQueries";

export const Header = () => {
    const { data: user } = useAuthUserQuery();
    const { data: enhancedUser } = useEnhancedUserQuery();
    const signOutMutation = useSignOutMutation();

    const handleSignOut = async () => {
        try {
            // Clear stored GitHub token
            localStorage.removeItem("github_access_token");
            await signOutMutation.mutateAsync();
        } catch (error) {
            console.error("Sign out failed:", error);
        }
    };

    // Use enhanced user data if available, fallback to regular user data
    const displayUser = enhancedUser || user;
    const githubData = (enhancedUser as any)?.githubData;

    // Get display values with fallbacks
    const displayName =
        githubData?.name ||
        displayUser?.displayName ||
        githubData?.login ||
        "Not provided";
    const avatarUrl = githubData?.avatar_url || displayUser?.photoURL;
    return (
        <header
            style={{
                backgroundColor: "white",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                borderBottom: "1px solid #e5e7eb",
            }}
        >
            <div
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "0 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "64px",
                }}
            >
                <h1
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: "600",
                        color: "#111827",
                    }}
                >
                    Dashboard
                </h1>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >
                    {displayUser && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                            }}
                        >
                            {avatarUrl && (
                                <img
                                    src={avatarUrl}
                                    alt={displayName}
                                    style={{
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "50%",
                                    }}
                                />
                            )}
                            <span
                                style={{
                                    fontSize: "0.875rem",
                                    color: "#374151",
                                }}
                            >
                                {displayName}
                            </span>
                        </div>
                    )}

                    <button
                        onClick={handleSignOut}
                        disabled={signOutMutation.isPending}
                        style={{
                            backgroundColor: signOutMutation.isPending
                                ? "#ef4444"
                                : "#dc2626",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            border: "none",
                            cursor: signOutMutation.isPending
                                ? "not-allowed"
                                : "pointer",
                            transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            if (!signOutMutation.isPending) {
                                e.currentTarget.style.backgroundColor =
                                    "#b91c1c";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!signOutMutation.isPending) {
                                e.currentTarget.style.backgroundColor =
                                    "#dc2626";
                            }
                        }}
                    >
                        {signOutMutation.isPending
                            ? "Signing out..."
                            : "Sign Out"}
                    </button>
                </div>
            </div>
        </header>
    );
};
