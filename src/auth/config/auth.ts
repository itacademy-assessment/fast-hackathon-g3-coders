import {
    GithubAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "./firebase";

export const doSignInWithGitHub = async () => {
    const provider = new GithubAuthProvider();

    // Request additional scopes from GitHub
    provider.addScope("user:email");
    provider.addScope("read:user");
    provider.addScope("user:name");

    // Set custom parameters to ensure we get public profile info
    provider.setCustomParameters({
        allow_signup: "true",
    });

    try {
        const result = await signInWithPopup(auth, provider);

        // Debug: Log what we received from GitHub
        console.log("GitHub auth result:", {
            user: result.user,
            providerId: result.providerId,
            operationType: result.operationType,
        });

        // Get the GitHub credential and access token
        const credential = GithubAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;

        if (accessToken) {
            console.log("GitHub access token received:", accessToken);
            // Store the access token for later use
            localStorage.setItem("github_access_token", accessToken);

            // Optionally fetch additional user data from GitHub API
            try {
                const response = await fetch("https://api.github.com/user", {
                    headers: {
                        Authorization: `token ${accessToken}`,
                        Accept: "application/vnd.github.v3+json",
                    },
                });

                if (response.ok) {
                    const githubUserData = await response.json();
                    console.log("GitHub API user data:", githubUserData);

                    // If Firebase user doesn't have email, try to get it from GitHub API
                    if (!result.user.email && githubUserData.email) {
                        console.log(
                            "Email from GitHub API:",
                            githubUserData.email
                        );
                    }
                }
            } catch (apiError) {
                console.error(
                    "Failed to fetch additional GitHub user data:",
                    apiError
                );
            }
        }

        return result;
    } catch (error: any) {
        console.error("GitHub sign-in error:", error);

        // Handle account linking for existing accounts
        if (error.code === "auth/account-exists-with-different-credential") {
            const email = error.customData?.email;

            if (email) {
                try {
                    // Get the sign-in methods for this email
                    const methods = await fetchSignInMethodsForEmail(
                        auth,
                        email
                    );
                    console.log(
                        "Available sign-in methods for this email:",
                        methods
                    );

                    // Create a more user-friendly error message
                    const methodsText =
                        methods.length > 0
                            ? methods.join(", ")
                            : "an unknown provider";

                    throw new Error(
                        `This email (${email}) is already associated with an account using ${methodsText}. ` +
                            `Please contact support or delete your existing account to use GitHub authentication.`
                    );
                } catch (linkError: any) {
                    console.error("Account linking error:", linkError);

                    // If we can't fetch sign-in methods, provide a generic message
                    throw new Error(
                        `This email is already associated with another account. ` +
                            `Please contact support or try a different email address.`
                    );
                }
            } else {
                throw new Error(
                    `An account with this email already exists with a different sign-in method. ` +
                        `Please try signing in with a different method.`
                );
            }
        }

        // Re-throw other errors as-is
        throw error;
    }
};

export const doSignInWithGitHubRedirect = async () => {
    const provider = new GithubAuthProvider();
    provider.addScope("user:email");
    provider.addScope("read:user");

    try {
        return await signInWithRedirect(auth, provider);
    } catch (error) {
        console.error("GitHub redirect sign-in error:", error);
        throw error;
    }
};

export const handleRedirectResult = async () => {
    try {
        return await getRedirectResult(auth);
    } catch (error) {
        console.error("GitHub redirect result error:", error);
        throw error;
    }
};

export const doSignOut = () => {
    return auth.signOut();
};

export const getCurrentUser = () => {
    return auth.currentUser;
};

export const getGitHubCredential = (result: any) => {
    if (result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        return { credential, token };
    }
    return null;
};

export const fetchGitHubUserData = async (accessToken: string) => {
    try {
        const [userResponse, emailResponse] = await Promise.all([
            fetch("https://api.github.com/user", {
                headers: {
                    Authorization: `token ${accessToken}`,
                    Accept: "application/vnd.github.v3+json",
                },
            }),
            fetch("https://api.github.com/user/emails", {
                headers: {
                    Authorization: `token ${accessToken}`,
                    Accept: "application/vnd.github.v3+json",
                },
            }),
        ]);

        const userData = userResponse.ok ? await userResponse.json() : null;
        const emailData = emailResponse.ok ? await emailResponse.json() : null;

        // Find primary email from the emails array
        const primaryEmail =
            emailData?.find((email: any) => email.primary)?.email ||
            userData?.email;

        return {
            name: userData?.name || userData?.login,
            email: primaryEmail,
            login: userData?.login,
            avatar_url: userData?.avatar_url,
            public_email: userData?.email,
            company: userData?.company,
            location: userData?.location,
            bio: userData?.bio,
        };
    } catch (error) {
        console.error("Failed to fetch GitHub user data:", error);
        return null;
    }
};
