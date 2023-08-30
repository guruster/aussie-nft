/* eslint-disable */
import { useLocation, Outlet } from 'react-router-dom';
//
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

        <MainFooter />
    </>
  );
}
