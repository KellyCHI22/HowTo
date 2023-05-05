import { Link, Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <>
      <header>Navbar</header>
      <Link to="/search">Search something</Link>
      <Outlet />
    </>
  );
}
