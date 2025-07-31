import { Header } from "../components/Header";
import RepoFilters from "../components/RepoFilters";
import RepoList from "../components/RepoList";
import { RepoProvider } from "../context/RepoContext";

export const HomePage = () => {
    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
            <Header />
            <RepoProvider>
                <div className="p-4">
                    <h1 className="text-xl font-bold mb-4">
                        Repositorios del Equipo
                    </h1>
                    <RepoFilters />
                    <RepoList />
                </div>
            </RepoProvider>
        </div>
    );
};
