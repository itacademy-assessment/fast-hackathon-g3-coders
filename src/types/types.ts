export interface Repo {
    id: number;
    name: string;
    html_url: string;
    language: string;
    owner: {
      login: string;
    };
    description: string;
  }
  