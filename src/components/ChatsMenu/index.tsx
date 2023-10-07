import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import Room from '../Room';
import Loader from '../Loader';

import store from '../../store';

const ChatsMenu = () => {
  const rooms = store.rooms;

  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [loading, setIsLoading] = React.useState(true);
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      await store.getRooms();

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const generateRandomString = () => {
    const i = Math.floor(Math.random() * 10) + 1;

    let rnd = '';
    while (rnd.length < i) rnd += Math.random().toString(36).substring(2);

    setValue(`room${rnd.substring(0, i)}`);
  };

  const handleCreateRoom = async (roomName: string) => {
    const regex = /^[a-zA-Z0-9]+$/;

    if (!value) {
      setError('Нужно ввести название');
      return;
    }

    if (!regex.test(roomName)) {
      setError('Уберите русский язык из названия');
      return;
    }

    setError('');
    setBtnDisabled(true);

    await store.addRoom(roomName);

    setBtnDisabled(false);
    setValue('');
    handleClose();
  };

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
          {!!error && (
            <Typography component="p" sx={{ mb: 2, color: 'red' }}>
              {error}
            </Typography>
          )}
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
          <Button
            onClick={() => handleCreateRoom(value)}
            sx={{ mt: 1 }}
            type="submit"
            fullWidth
            variant="contained"
            disabled={btnDisabled}
          >
            Создать комнату
          </Button>
        </Box>
      </Modal>
      {loading ? (
        <Loader text="Загрузка комнат..." />
      ) : (
        <Grid container sx={{ gap: '1rem' }}>
          {rooms.map((room) => (
            <Room key={room.uuid} room={room} />
          ))}
        </Grid>
      )}
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

export default observer(ChatsMenu);
