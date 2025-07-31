// src/utils/fetchRepos.ts
import { type Repo } from "../types/types";

export async function fetchReposForUsers(usernames: string[]): Promise<Repo[]> {
    const allRepos: Repo[] = [];

    for (const username of usernames) {
        const res = await fetch(
            `https://api.github.com/users/${username}/repos`
        );
        if (!res.ok) continue;

        const repos: Repo[] = await res.json();
        allRepos.push(...repos);
    }

    return allRepos;
}
