import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// pages
import {PATH_AUTH} from '../routes/paths';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AuthGuard({ children }) {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATH_AUTH.login);
    }
  }, [isAuthenticated, navigate])
  
  return <>{children}</>;
}
