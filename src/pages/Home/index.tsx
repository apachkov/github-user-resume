import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    if (trimmedUsername === '') {
      return;
    }
    navigate(`/${trimmedUsername}`);
  }
  return (
    <div>
      <h2>Home</h2>
      <form action="#" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className={'form-label'} htmlFor="username">Input a Github username:</label>
          <div className="row g-3">
            <div className="col-auto">
              <input className={'form-control'}
                     type="text"
                     id={'username'}
                     name={'username'}
                     placeholder={'username'}
                     value={username}
                     onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button className={'btn btn-primary'}>Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
