import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete';

import { IChat } from '../../types';
import store from '../../store';
import normalizeDate from '../../utils/normalizeDate';

interface RoomProps {
  room: IChat;
}

const Room: FC<RoomProps> = ({ room }) => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const roomDate = normalizeDate(new Date(room.created_at));

  const handleDeleteRoom = async (uuid: string) => {
    setBtnDisabled(true);

    await store.deleteRoom(uuid);

    setBtnDisabled(false);
    handleClose();
  };

  return (
    <Grid
      item
      xs={12}
      sx={{ display: 'flex', alignItems: 'center', gap: '.3rem' }}
    >
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
          <Typography align="center">
            Вы уверены, что хотите удалить комнату {room.uuid}?
          </Typography>
          <Button
            onClick={() => handleDeleteRoom(room.uuid)}
            sx={{ mt: 3 }}
            type="submit"
            fullWidth
            variant="contained"
            disabled={btnDisabled}
          >
            Да
          </Button>
          <Button
            onClick={handleClose}
            sx={{ mt: 1 }}
            type="submit"
            fullWidth
            variant="outlined"
          >
            Нет
          </Button>
        </Box>
      </Modal>
      <Box
        onClick={() => navigate(`/chat/${room.uuid}`)}
        sx={{
          flex: '1',
          py: 1,
          color: 'white',
          backgroundColor: 'primary.light',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          borderRadius: '.5rem',
        }}
      >
        <Typography>Комната {room.uuid}</Typography>
        <Typography sx={{ mt: 0, opacity: 0.5, fontSize: '0.75rem' }}>
          Дата создания: {roomDate}
        </Typography>
      </Box>
      <DeleteIcon
        onClick={handleOpen}
        sx={{ color: 'primary.dark', cursor: 'pointer' }}
      />
    </Grid>
  );
};

export default Room;
