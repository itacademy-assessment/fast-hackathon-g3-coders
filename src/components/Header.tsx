import { NavLink } from "react-router-dom";
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
        <header>
            <nav
                className="navbar navbar-dark"
                style={{ backgroundColor: "#1f2937", padding: "0.75rem 1rem" }}
            >
                <div className="container-fluid">
                    {/* Left side - Brand/Title */}
                    <NavLink
                        to="/"
                        className="navbar-brand"
                        style={{
                            color: "white",
                            fontWeight: "700",
                            fontSize: "1.5rem",
                            textDecoration: "none",
                            margin: 0,
                        }}
                    >
                        G3-Coders
                    </NavLink>

                    <div>
                        {displayUser && (
                            <div className="d-flex align-items-center gap-3">
                                {/* User Avatar and Name */}
                                <div className="d-flex align-items-center gap-2">
                                    {avatarUrl && (
                                        <img
                                            src={avatarUrl}
                                            alt={displayName}
                                            style={{
                                                width: "36px",
                                                height: "36px",
                                                borderRadius: "50%",
                                                border: "2px solid rgba(255, 255, 255, 0.2)",
                                            }}
                                        />
                                    )}
                                    <span
                                        style={{
                                            fontSize: "0.9rem",
                                            color: "white",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {displayName}
                                    </span>
                                </div>
                            </div>
                        )}
                        <ul className="flex flex-row list-unstyled mb-0">
                            <li className="nav-item">
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                    style={({ isActive }) => ({
                                        color: isActive ? "#60a5fa" : "white",
                                        fontWeight: "500",
                                        textDecoration: "none",
                                        padding: "12px 20px",
                                        borderRadius: "8px",
                                        transition: "all 0.2s",
                                        borderBottom: isActive
                                            ? "2px solid #60a5fa"
                                            : "2px solid transparent",
                                        marginBottom: "8px",
                                    })}
                                    onMouseEnter={(e) => {
                                        if (
                                            !e.currentTarget.classList.contains(
                                                "active"
                                            )
                                        ) {
                                            e.currentTarget.style.backgroundColor =
                                                "rgba(255, 255, 255, 0.1)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (
                                            !e.currentTarget.classList.contains(
                                                "active"
                                            )
                                        ) {
                                            e.currentTarget.style.backgroundColor =
                                                "transparent";
                                        }
                                    }}
                                >
                                    📖 About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                    style={({ isActive }) => ({
                                        color: isActive ? "#60a5fa" : "white",
                                        fontWeight: "500",
                                        textDecoration: "none",
                                        padding: "12px 20px",
                                        borderRadius: "8px",
                                        transition: "all 0.2s",
                                        borderBottom: isActive
                                            ? "2px solid #60a5fa"
                                            : "2px solid transparent",
                                        marginBottom: "8px",
                                    })}
                                    onMouseEnter={(e) => {
                                        if (
                                            !e.currentTarget.classList.contains(
                                                "active"
                                            )
                                        ) {
                                            e.currentTarget.style.backgroundColor =
                                                "rgba(255, 255, 255, 0.1)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (
                                            !e.currentTarget.classList.contains(
                                                "active"
                                            )
                                        ) {
                                            e.currentTarget.style.backgroundColor =
                                                "transparent";
                                        }
                                    }}
                                >
                                    👤 Profile
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <hr
                                    style={{
                                        border: "none",
                                        borderTop:
                                            "1px solid rgba(255, 255, 255, 0.2)",
                                        margin: "8px 16px",
                                    }}
                                />
                            </li>
                            <li className="nav-item">
                                <button
                                    onClick={handleSignOut}
                                    disabled={signOutMutation.isPending}
                                    className="nav-link btn"
                                    style={{
                                        color: "#f87171",
                                        fontWeight: "500",
                                        textDecoration: "none",
                                        padding: "12px 20px",
                                        borderRadius: "8px",
                                        transition: "all 0.2s",
                                        border: "none",
                                        backgroundColor: "transparent",
                                        width: "100%",
                                        textAlign: "left",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!signOutMutation.isPending) {
                                            e.currentTarget.style.backgroundColor =
                                                "rgba(248, 113, 113, 0.1)";
                                            e.currentTarget.style.color =
                                                "#fca5a5";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!signOutMutation.isPending) {
                                            e.currentTarget.style.backgroundColor =
                                                "transparent";
                                            e.currentTarget.style.color =
                                                "#f87171";
                                        }
                                    }}
                                >
                                    {signOutMutation.isPending ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"
                                                style={{
                                                    width: "16px",
                                                    height: "16px",
                                                }}
                                            ></span>
                                            Signing out...
                                        </>
                                    ) : (
                                        <>🚪 Sign Out</>
                                    )}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};
