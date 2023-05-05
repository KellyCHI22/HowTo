import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>
      <button className="bg-teal-500">
        <Link to="/howtos">Explore</Link>
      </button>
    </div>
  );
}
