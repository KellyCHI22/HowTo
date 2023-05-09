import { Link, useOutletContext } from 'react-router-dom';
import Button from '~/components/elements/Button';

export default function HomePage() {
  const handleToggleLoginModal: () => void = useOutletContext();
  return (
    <div>
      <h1>HomePage</h1>
      <Button loading={false} basic primary>
        <Link to="/howtos">Explore</Link>
      </Button>
      <br />
      <Button loading={false} basic primary onClick={handleToggleLoginModal}>
        Log in
      </Button>
    </div>
  );
}
