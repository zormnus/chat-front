import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import authStore from './store';

const PrivateRoute = () => {
  React.useEffect(() => {
    const getAccess = async () => {
      await authStore.checkAuth();
    };

    getAccess();
  }, []);

  if (authStore.isAuthInProgress) {
    return <div>Checking auth...</div>;
  }
  if (authStore.isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth" />;
  }
};

export default observer(PrivateRoute);
