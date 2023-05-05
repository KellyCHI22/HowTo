import { Link } from 'react-router-dom';

export default function ExplorePage() {
  return (
    <div>
      <h2>ExplorePage</h2>
      <Link to="/howtos/123">Go to HowTo 123</Link>
      <Link to="/howtos/456">Go to HowTo 456</Link>
      <Link to="/create">Create new HowTo</Link>
    </div>
  );
}
