import { Link, useOutletContext } from 'react-router-dom';
import Button from '~/components/elements/Button';

// todo: will need to be refactored
type ContextType = {
  handleToggleLoginModal: () => void;
  handleToggleSignupModal: () => void;
};

export default function HomePage() {
  const { handleToggleLoginModal, handleToggleSignupModal } =
    useOutletContext<ContextType>();
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
      <Button loading={false} basic primary onClick={handleToggleSignupModal}>
        Sign up
      </Button>
    </div>
  );
}
