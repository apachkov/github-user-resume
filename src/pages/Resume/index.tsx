import { useParams } from "react-router-dom";
import useGithubUser from "../../hooks/useGithubUser";
import useGithubUserRepositories from "../../hooks/useGithubUserRepositories";

export default function Resume() {
  const { username } = useParams();
  const { user, loading: isUserLoading } = useGithubUser(username);
  const { repositories, languages, totalRepositories, loading: isRepositoriesLoading } = useGithubUserRepositories(username);

  return (
    <div>
      <h2>Resume</h2>
      <p>
        This is the resume for <strong>{username}</strong>.
      </p>
      <hr />
      <h3>User</h3>
      {isUserLoading ? (
        <p>
          Loading user...
        </p>
      ) : user.status == 404 ? (
        <p>
          User not found.
        </p>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Public Repos:</strong> {user.public_repos}
          </p>
          <p>
            <strong>Github member since:</strong> {new Date(user.created_at).toLocaleString('en-US')}
          </p>
        </div>
      )}
      <hr />
      {isRepositoriesLoading ? (
        <p>
          Loading repositories...
        </p>
      ) : (
        <>
          <h3>Languages:</h3>
          <ul>
            {languages && Object.keys(languages).map((language) => (
              <li key={language}>
                <strong>{language}</strong>: {Math.round(languages[language] / totalRepositories * 100)}%
              </li>
            ))}
          </ul>
          <hr/>
          <h3>Repositories:</h3>
          {repositories.map(repo => (
            <div key={repo.id}>
              <p>
                <strong>Name:</strong> <a href={`https://github.com/${repo.full_name}`} target="_blank">{repo.name}</a>
              </p>
              {repo.description && <p>
                <strong>Description:</strong> {repo.description}
              </p>}
              {repo.language && <p>
                <strong>Language:</strong> {repo.language}
              </p>}
              <p>
                <strong>Last updated:</strong> {new Date(repo.updated_at).toLocaleString('en-US')}
              </p>
              <hr/>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
