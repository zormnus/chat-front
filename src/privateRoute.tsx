import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Loader from './components/Loader';

import authStore from './store';

const PrivateRoute = () => {
  React.useEffect(() => {
    const getAccess = async () => {
      await authStore.checkAuth();
    };

    getAccess();
  }, []);

  if (authStore.isAuthInProgress) {
    return <Loader text="Проверка авторизации..." />;
  }
  if (authStore.isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth" />;
  }
};

export default observer(PrivateRoute);
