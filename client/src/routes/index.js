/* eslint-disable */
import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import LoadingScreen from '../components/LoadingScreen';
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <LandingPage /> },
        { path: '/terms', element: <TermsPage /> },
        { path: '/privacy', element: <PrivacyPage /> },
        { path: '/:id', element: <TestPage /> },
        { path: '/private/admin', element: <AdminPage /> },
        // { path: '/user', element: <AuthGuard><UserAccount /></AuthGuard> },
        { path: '/collection', element: <CollectionPage /> },
      ]
    }
  ]);
}

// IMPORT COMPONENTS
// Authentication
// const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Login = Loadable(lazy(() => import('../pages/web3auth/Web3Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Main
const LandingPage = Loadable(lazy(() => import('../pages/landing/LandingPage')));
const TermsPage = Loadable(lazy(() => import('../pages/TermsPage.js')));
const PrivacyPage = Loadable(lazy(() => import('../pages/Privacy.js')));
const TestPage = Loadable(lazy(() => import('../pages/Test.js')));
const AdminPage = Loadable(lazy(() => import('../pages/Admin.js')));
const UserAccount = Loadable(lazy(() => import('../pages/user/UserAccount')));
const CollectionPage = Loadable(lazy(() => import('../pages/collection/Collection')));