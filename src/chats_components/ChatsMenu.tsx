import React from 'react';
import { useNavigate } from 'react-router-dom';

import checkToken from '../api/checkToken';

const ChatsMenu = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const isTokenValid = await checkToken();

      if (isTokenValid) {
        setIsLoading(false);
      } else {
        navigate('/auth');
      }
    };

    fetchData();
  }, []);

  return <div>{!isLoading ? <p>Тут будут чаты</p> : null}</div>;
};

export default ChatsMenu;
