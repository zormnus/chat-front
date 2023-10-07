import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Loader from './components/Loader';

import store from './store';

const PrivateRoute = () => {
  React.useEffect(() => {
    const getAccess = async () => {
      await store.checkAuth();
    };

    getAccess();
  }, []);

  if (store.isAuthInProgress) {
    return <Loader text="Проверка авторизации..." />;
  }
  if (store.isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth" />;
  }
};

export default PrivateRoute;
