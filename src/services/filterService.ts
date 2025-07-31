import { type Repo } from "../types/types";

export function filterRepos(
  repos: Repo[],
  filters: { language?: string; owner?: string; nameSearch?: string }
): Repo[] {
  const { language, owner, nameSearch } = filters;

  return repos.filter((repo) =>
    (!language || repo.language === language) &&
    (!owner || repo.owner.login === owner) &&
    (!nameSearch || repo.name.toLowerCase().includes(nameSearch.toLowerCase()))
  );
}