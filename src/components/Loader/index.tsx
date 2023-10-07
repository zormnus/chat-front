import { FC } from 'react';

import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoaderProps {
  text: string;
}

const Loader: FC<LoaderProps> = ({ text }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 5,
      }}
    >
      <Typography component="h2" align="center" sx={{ mb: 3 }}>
        {text}
      </Typography>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
