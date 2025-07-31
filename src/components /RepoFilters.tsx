import { useRepoContext } from "../context/RepoContext";

const RepoFilters: React.FC = () => {
  const { repos, setFilters } = useRepoContext();

  const languages = Array.from(new Set(repos.map(r => r.language).filter(Boolean)));
  const owners = Array.from(new Set(repos.map(r => r.owner.login)));

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <input
        type="text"
        placeholder="Buscar por nombre"
        onChange={(e) => setFilters({ nameSearch: e.target.value })}
        className="border p-2 rounded"
      />
      <select onChange={(e) => setFilters({ language: e.target.value })} className="border p-2 rounded">
        <option value="">Todos los lenguajes</option>
        {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
      </select>
      <select onChange={(e) => setFilters({ owner: e.target.value })} className="border p-2 rounded">
        <option value="">Todos los propietarios</option>
        {owners.map(owner => <option key={owner} value={owner}>{owner}</option>)}
      </select>
    </div>
  );
};

export default RepoFilters;