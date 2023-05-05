import { NavLink, Outlet } from 'react-router-dom';

export default function HowToLayout() {
  return (
    <>
      <aside>
        This is the sidebar
        <NavLink to="/howtos">Explore</NavLink>
        <NavLink to="/bookmarks">Bookmarks</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </aside>
      <main>
        <Outlet />
      </main>
    </>
  );
}
