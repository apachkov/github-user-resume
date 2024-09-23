import { useParams } from "react-router-dom";
import useGithubUser from "../../hooks/useGithubUser";
import useGithubUserRepositories from "../../hooks/useGithubUserRepositories";
import PieChartComponent from "../../components/pie-chart";

export default function Resume() {
  const { username } = useParams();
  const { user, loading: isUserLoading } = useGithubUser(username);
  const { repositories, languages, loading: isRepositoriesLoading } = useGithubUserRepositories(username);
  const isUserNotFound = user.status == 404;
  const APIRateLimitExceeded = user.message?.startsWith('API rate limit exceeded');

  if (APIRateLimitExceeded) {
    return (
      <div>
        <h3>
          API rate limit exceeded.
        </h3>
        <p>
          Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div>
      {isUserLoading ? (
        <p>
          Loading user...
        </p>
      ) : isUserNotFound ? (
        <h3>
          User not found.
        </h3>
      ) : (
        <div>
          <div className={'row'}>
            <h3>{user.name}</h3>
            <p>
              Github username -{' '}
              <a className={'link-dark'} href={`https://github.com/${username}`} target={'_blank'}>{username}</a>
            </p>
            <div className="col-md-4">
              <div className={'round-image'}>
                <img src={user.avatar_url} alt={user.name}/>
              </div>
            </div>
            <div className="col-md-8">
              <p>
                Github member since <strong>{new Date(user.created_at).getFullYear()}</strong>,
                and have <strong>
                <a href={`https://github.com/${username}?tab=repositories`} target="_blank">
                  {user.public_repos} public repositories
                </a>
              </strong>.
              </p>
              <p>
                {user.bio}
              </p>
            </div>
          </div>
        </div>
      )}
      <hr/>
      {isUserNotFound ?
        null
        : isRepositoriesLoading ? (
          <p>
            Loading repositories...
          </p>
        ) : (
          <div className={'row'}>
          <div className={'col-md-4'}>
              <h3>
                <em>
                  Languages:
                </em>
              </h3>
            </div>
            <div className={'col-md-8'}>
              <PieChartComponent data={languages}></PieChartComponent>
            </div>
            <hr/>
            <div className={'col-md-4'}>
              <h3>
                <em>
                  Most recent repositories:
                </em>
              </h3>
            </div>
            <div className={'col-md-8'}>
              {repositories.map(repo => (
                <div key={repo.id}>
                  <h4 className={'space-between'}>
                    <span>
                      <a href={`https://github.com/${repo.full_name}`} target="_blank">{repo.name}</a> {repo.language && <>({repo.language})</>}
                    </span>
                    <span className={'date'}>
                      {new Date(repo.created_at).getFullYear()} - {new Date(repo.updated_at).getFullYear()}
                    </span>
                  </h4>
                  {repo.description && <p>
                    {repo.description}
                  </p>}
                  <hr/>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}
