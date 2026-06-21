import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { ROUTES } from '@/utils/constants';

/**
 * Redirects unauthenticated users to the login page, remembering where they
 * were headed so they can be returned there after signing in.
 */
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((s) => s.user.current);
  const location = useLocation();

  if (!user) {
    return <Navigate to={ROUTES.login} state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
