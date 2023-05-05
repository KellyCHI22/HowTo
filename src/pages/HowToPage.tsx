import { Link, useParams } from 'react-router-dom';

export default function HowToPage() {
  const { id } = useParams();
  return (
    <div>
      <h2>HowTo {id} Page</h2>
      <Link to={`/users/${id}`}>Go to user {id} page</Link>
    </div>
  );
}
