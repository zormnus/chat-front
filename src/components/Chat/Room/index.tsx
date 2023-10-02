import { FC } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { IRoom } from '../../../types';

interface RoomProps {
  room: IRoom;
  onClick?: () => void;
}

const Room: FC<RoomProps> = ({ room, onClick }) => {
  return (
    <Grid
      item
      onClick={onClick}
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
