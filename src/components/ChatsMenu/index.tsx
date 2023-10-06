import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import Room from '../Room';

import { IRoom } from '../../types';

const ChatsMenu = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState('');

  const generateRandomString = () => {
    const i = Math.floor(Math.random() * 10);

    let rnd = '';
    while (rnd.length < i) rnd += Math.random().toString(36).substring(2);

    setValue(rnd.substring(0, i));
  };

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
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            width: 400,
            p: 4,
          }}
        >
          <TextField
            sx={{ width: '100%' }}
            placeholder="Введите название комнаты"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            onClick={generateRandomString}
            sx={{ mt: 3 }}
            type="submit"
            fullWidth
            variant="contained"
          >
            Сгенерировать название
          </Button>
          <Button sx={{ mt: 1 }} type="submit" fullWidth variant="contained">
            Создать комнату
          </Button>
        </Box>
      </Modal>
      <Grid container sx={{ gap: '1rem' }}>
        {rooms.map((room) => (
          <Room key={room.id} room={room} />
        ))}
      </Grid>
      <Button
        onClick={handleOpen}
        sx={{ mt: 5 }}
        type="submit"
        fullWidth
        variant="contained"
      >
        Создать комнату
      </Button>
    </Container>
  );
};

export default ChatsMenu;
