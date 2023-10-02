import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';

import Room from '../Room';

import checkToken from '../../api/checkToken';
import { IRoom } from '../../types';

const ChatsMenu = () => {
  const rooms: IRoom[] = [
    { id: 0, title: 'Комната 1' },
    { id: 1, title: 'Комната 2' },
    { id: 2, title: 'Комната 3' },
    { id: 3, title: 'Комната 4' },
    { id: 4, title: 'Комната 5' },
    { id: 5, title: 'Комната 6' },
  ];

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

  return (
    <Container maxWidth="md">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Grid container sx={{ gap: '1rem' }}>
          {rooms.map((room) => (
            <Room key={room.id} room={room} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ChatsMenu;
