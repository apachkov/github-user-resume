import { useParams } from "react-router-dom";

export default function Resume() {
  const { username } = useParams();

  return (
    <div>
      <h2>Resume</h2>
      <p>
        This is the resume for <strong>{username}</strong>.
      </p>
    </div>
  );
}
