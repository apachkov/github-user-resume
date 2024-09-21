import { useEffect, useState } from "react";

export default function useGithubUser(username: string | undefined) {
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username === undefined) {
      return;
    }

    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

  return { loading, user };
}
