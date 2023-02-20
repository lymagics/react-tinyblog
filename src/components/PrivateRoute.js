import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';

export default function PrivateRoute({ children }) {
  const { user } = useUser();

  if (user === undefined) {
    return null;
  }
  else if (user === null) {
    return <Navigate to='/login' />
  }
  else {
    return children;
  }
}