import { useEffect, useState } from "react";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export default function useGithubUserRepositories(username: string | undefined) {
  const [loading, setLoading] = useState(true);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [languages, setLanguages] = useState<any>({});
  const [totalRepositories, setTotalRepositories] = useState(0);

  useEffect(() => {
    if (username === undefined) {
      return;
    }

    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => {
        setLoading(false);
        if (response.status === 403) {
          throw new Error('Rate limit exceeded');
        }
        return response.json();
      })
      .then((data: Repository[]) => {
        data.sort((a, b) => b.updated_at > a.updated_at ? 1 : -1);
        const first10Repos = data.slice(0, 10);
        setRepositories(first10Repos);
        const newLanguages = data.reduce((acc: any, repo: any) => {
          const language = repo.language || 'Not specified';

          if (acc[language]) {
            acc[language] += 1;
          } else {
            acc[language] = 1;
          }

          return acc;
        }, {});
        setLanguages(newLanguages);
        setTotalRepositories(data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

  return { loading, repositories, languages, totalRepositories };
}
