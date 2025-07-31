import { createContext, useContext, useEffect, useState } from "react";
import type { Repo } from "../types/types";
import { fetchReposForUsers } from "../services/fetchService";
import { filterRepos } from "../services/filterService";

const TEAM = ["BauveR", "DiegoAPaez", "Jperaire", "pedroinfante92", "laisrod"];

interface RepoContextProps {
    repos: Repo[];
    filteredRepos: Repo[];
    setFilters: (filters: {
        language?: string;
        owner?: string;
        nameSearch?: string;
    }) => void;
}

const RepoContext = createContext<RepoContextProps | undefined>(undefined);

export const RepoProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]);
    const [filters, setFilters] = useState<{
        language?: string;
        owner?: string;
        nameSearch?: string;
    }>({});

    useEffect(() => {
        const loadRepos = async () => {
            const data = await fetchReposForUsers(TEAM);
            setRepos(data);
            setFilteredRepos(data);
        };
        loadRepos();
    }, []);

    useEffect(() => {
        setFilteredRepos(filterRepos(repos, filters));
    }, [filters, repos]);

    return (
        <RepoContext.Provider value={{ repos, filteredRepos, setFilters }}>
            {children}
        </RepoContext.Provider>
    );
};

export const useRepoContext = () => {
    const context = useContext(RepoContext);
    if (!context) {
        throw new Error("useRepoContext must be used within a RepoProvider");
    }
    return context;
};
