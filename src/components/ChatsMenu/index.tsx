import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Room from '../Room';

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

  return (
    <Container maxWidth="md">
      <Grid container sx={{ gap: '1rem' }}>
        {rooms.map((room) => (
          <Room key={room.id} room={room} />
        ))}
      </Grid>
      <Button sx={{ mt: 5 }} type="submit" fullWidth variant="contained">
        Создать комнату
      </Button>
    </Container>
  );
};

export default ChatsMenu;
