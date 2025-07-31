import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../config/firebase";
import {
    doSignInWithGitHub,
    doSignOut,
    fetchGitHubUserData,
} from "../config/auth";

// Query to get current authenticated user
export const useAuthUserQuery = () => {
    return useQuery({
        queryKey: ["authUser"],
        queryFn: () => {
            return new Promise<User | null>((resolve) => {
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    unsubscribe();
                    resolve(user);
                });
            });
        },
        staleTime: Infinity, // User auth state doesn't change frequently
    });
};

// Query to get enhanced user data from GitHub API
export const useEnhancedUserQuery = () => {
    const { data: user } = useAuthUserQuery();

    return useQuery({
        queryKey: ["enhancedUser", user?.uid],
        queryFn: async () => {
            if (!user) return null;

            // Try to get stored access token (this would need to be stored during sign-in)
            const accessToken = localStorage.getItem("github_access_token");

            if (accessToken) {
                const githubData = await fetchGitHubUserData(accessToken);
                return {
                    ...user,
                    githubData,
                };
            }

            return user;
        },
        enabled: !!user,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Mutation for GitHub sign in
export const useGitHubSignInMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: doSignInWithGitHub,
        onSuccess: (result) => {
            // Update the auth user query cache
            queryClient.setQueryData(["authUser"], result.user);
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            queryClient.invalidateQueries({ queryKey: ["enhancedUser"] });
        },
        onError: (error) => {
            console.error("GitHub sign-in failed:", error);
        },
    });
}; // Mutation for sign out
export const useSignOutMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: doSignOut,
        onSuccess: () => {
            // Clear auth user from cache
            queryClient.setQueryData(["authUser"], null);
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (error) => {
            console.error("Sign out failed:", error);
        },
    });
};
