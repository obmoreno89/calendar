import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPages } from '../auth';
import { CalendarPages } from '../calendar';
import { useAuthStore } from '../hooks';

const AppRouter = () => {
  const authStatus = 'not-authenticated';

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path='/auth/*' element={<LoginPages />} />
          <Route path='/*' element={<Navigate to='/auth/login' />} />
        </>
      ) : (
        <>
          <Route path='/' element={<CalendarPages />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
