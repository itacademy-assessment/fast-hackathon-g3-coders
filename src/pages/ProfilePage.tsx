import {
    useAuthUserQuery,
    useEnhancedUserQuery,
} from "../auth/query/authQueries";
import { Header } from "../components/Header";

export const ProfilePage = () => {
    const { data: user } = useAuthUserQuery();
    const { data: enhancedUser, isLoading: isLoadingEnhanced } =
        useEnhancedUserQuery();

    // Use enhanced user data if available, fallback to regular user data
    const displayUser = enhancedUser || user;
    const githubData = (enhancedUser as any)?.githubData;

    // Get display values with fallbacks
    const displayName =
        githubData?.name ||
        displayUser?.displayName ||
        githubData?.login ||
        "Not provided";
    const displayEmail =
        githubData?.email || displayUser?.email || "Not provided";
    const avatarUrl = githubData?.avatar_url || displayUser?.photoURL;

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
            <Header />

            <main
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "24px 16px",
                }}
            >
                <div
                    style={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                        padding: "24px",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            color: "#111827",
                            marginBottom: "24px",
                        }}
                    >
                        User Profile
                    </h1>

                    {isLoadingEnhanced && (
                        <div
                            style={{
                                padding: "16px",
                                textAlign: "center",
                                color: "#6b7280",
                            }}
                        >
                            <div
                                style={{
                                    display: "inline-block",
                                    width: "20px",
                                    height: "20px",
                                    border: "2px solid #f3f3f3",
                                    borderTop: "2px solid #3b82f6",
                                    borderRadius: "50%",
                                    animation: "spin 1s linear infinite",
                                    marginRight: "8px",
                                }}
                            />
                            Loading enhanced user data...
                        </div>
                    )}

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "24px",
                        }}
                    >
                        {/* Profile Header */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                padding: "16px",
                                backgroundColor: "#f9fafb",
                                borderRadius: "8px",
                            }}
                        >
                            {avatarUrl && (
                                <img
                                    src={avatarUrl}
                                    alt={displayName}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        borderRadius: "50%",
                                        border: "3px solid white",
                                        boxShadow:
                                            "0 2px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                />
                            )}
                            <div>
                                <h2
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "600",
                                        color: "#111827",
                                        margin: 0,
                                    }}
                                >
                                    {displayName}
                                </h2>
                                <p
                                    style={{
                                        color: "#6b7280",
                                        margin: "4px 0 0 0",
                                    }}
                                >
                                    {displayEmail}
                                </p>
                            </div>
                        </div>

                        {/* User Information */}
                        {displayUser && (
                            <div
                                style={{
                                    backgroundColor: "#f9fafb",
                                    borderRadius: "8px",
                                    padding: "16px",
                                }}
                            >
                                <h3
                                    style={{
                                        fontWeight: "600",
                                        color: "#111827",
                                        marginBottom: "12px",
                                    }}
                                >
                                    Account Information
                                </h3>
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(auto-fit, minmax(200px, 1fr))",
                                        gap: "12px",
                                    }}
                                >
                                    <div>
                                        <strong style={{ color: "#374151" }}>
                                            Firebase ID:
                                        </strong>
                                        <p
                                            style={{
                                                margin: "4px 0",
                                                color: "#6b7280",
                                                fontSize: "0.875rem",
                                                fontFamily: "monospace",
                                            }}
                                        >
                                            {displayUser.uid}
                                        </p>
                                    </div>
                                    <div>
                                        <strong style={{ color: "#374151" }}>
                                            Email Verified:
                                        </strong>
                                        <p
                                            style={{
                                                margin: "4px 0",
                                                color: "#6b7280",
                                            }}
                                        >
                                            {displayUser.emailVerified
                                                ? "✅ Yes"
                                                : "❌ No"}
                                        </p>
                                    </div>
                                    <div>
                                        <strong style={{ color: "#374151" }}>
                                            Account Created:
                                        </strong>
                                        <p
                                            style={{
                                                margin: "4px 0",
                                                color: "#6b7280",
                                            }}
                                        >
                                            {displayUser.metadata.creationTime
                                                ? new Date(
                                                      displayUser.metadata.creationTime
                                                  ).toLocaleDateString()
                                                : "Unknown"}
                                        </p>
                                    </div>
                                    <div>
                                        <strong style={{ color: "#374151" }}>
                                            Last Sign In:
                                        </strong>
                                        <p
                                            style={{
                                                margin: "4px 0",
                                                color: "#6b7280",
                                            }}
                                        >
                                            {displayUser.metadata.lastSignInTime
                                                ? new Date(
                                                      displayUser.metadata.lastSignInTime
                                                  ).toLocaleDateString()
                                                : "Unknown"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* GitHub Information */}
                        {githubData && (
                            <div
                                style={{
                                    backgroundColor: "#f0f9ff",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    border: "1px solid #bae6fd",
                                }}
                            >
                                <h3
                                    style={{
                                        fontWeight: "600",
                                        color: "#0c4a6e",
                                        marginBottom: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                    </svg>
                                    GitHub Information
                                </h3>
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(auto-fit, minmax(200px, 1fr))",
                                        gap: "12px",
                                    }}
                                >
                                    {githubData.login && (
                                        <div>
                                            <strong
                                                style={{ color: "#0c4a6e" }}
                                            >
                                                Username:
                                            </strong>
                                            <p
                                                style={{
                                                    margin: "4px 0",
                                                    color: "#075985",
                                                }}
                                            >
                                                @{githubData.login}
                                            </p>
                                        </div>
                                    )}
                                    {githubData.company && (
                                        <div>
                                            <strong
                                                style={{ color: "#0c4a6e" }}
                                            >
                                                Company:
                                            </strong>
                                            <p
                                                style={{
                                                    margin: "4px 0",
                                                    color: "#075985",
                                                }}
                                            >
                                                {githubData.company}
                                            </p>
                                        </div>
                                    )}
                                    {githubData.location && (
                                        <div>
                                            <strong
                                                style={{ color: "#0c4a6e" }}
                                            >
                                                Location:
                                            </strong>
                                            <p
                                                style={{
                                                    margin: "4px 0",
                                                    color: "#075985",
                                                }}
                                            >
                                                {githubData.location}
                                            </p>
                                        </div>
                                    )}
                                    {githubData.public_email &&
                                        githubData.public_email !==
                                            githubData.email && (
                                            <div>
                                                <strong
                                                    style={{ color: "#0c4a6e" }}
                                                >
                                                    Public Email:
                                                </strong>
                                                <p
                                                    style={{
                                                        margin: "4px 0",
                                                        color: "#075985",
                                                    }}
                                                >
                                                    {githubData.public_email}
                                                </p>
                                            </div>
                                        )}
                                </div>
                                {githubData.bio && (
                                    <div style={{ marginTop: "12px" }}>
                                        <strong style={{ color: "#0c4a6e" }}>
                                            Bio:
                                        </strong>
                                        <p
                                            style={{
                                                margin: "4px 0",
                                                color: "#075985",
                                                fontStyle: "italic",
                                                padding: "8px",
                                                backgroundColor:
                                                    "rgba(255, 255, 255, 0.5)",
                                                borderRadius: "4px",
                                            }}
                                        >
                                            "{githubData.bio}"
                                        </p>
                                    </div>
                                )}

                                <div
                                    style={{
                                        marginTop: "12px",
                                        padding: "8px",
                                        backgroundColor:
                                            "rgba(34, 197, 94, 0.1)",
                                        borderRadius: "4px",
                                        fontSize: "0.75rem",
                                        color: "#059669",
                                        textAlign: "center",
                                    }}
                                >
                                    ✓ Enhanced data loaded from GitHub API
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
