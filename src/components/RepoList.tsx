import { useRepoContext } from "../context/RepoContext";

const RepoList: React.FC = () => {
    const { filteredRepos } = useRepoContext();

    return (
        <ul className="space-y-3">
            {filteredRepos.map((repo) => (
                <li key={repo.id} className="border p-3 rounded">
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600"
                    >
                        {repo.name}
                    </a>
                    <p>{repo.description}</p>
                    <small>
                        {repo.language} — {repo.owner.login}
                    </small>
                </li>
            ))}
        </ul>
    );
};

export default RepoList;
