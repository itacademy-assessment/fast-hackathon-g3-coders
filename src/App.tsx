import { RepoProvider } from "./context/RepoContext";
import RepoList from "./components /RepoList";
import RepoFilters from "./components /RepoFilters";

function App() {
  return (
    <RepoProvider>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Repositorios del Equipo</h1>
        <RepoFilters />
        <RepoList />
      </div>
    </RepoProvider>
  );
}
export default App;