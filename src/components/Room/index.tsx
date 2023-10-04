import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { IRoom } from '../../types';

interface RoomProps {
  room: IRoom;
}

const Room: FC<RoomProps> = ({ room }) => {
  const navigate = useNavigate();

  return (
    <Grid
      onClick={() => navigate(`/chat/${room.id}`)}
      item
      xs={12}
      sx={{
        height: 50,
        color: 'white',
        backgroundColor: 'primary.light',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: '.5rem',
      }}
    >
      <Typography paragraph>{room.title}</Typography>
    </Grid>
  );
};

export default Room;
