import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Chat = () => {
  const { chatId } = useParams();

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          backgroundColor: '#edd4fc',
          color: 'white',
        }}
      >
        <TextField placeholder="Введите сообщение" sx={{ width: '100%' }} />
        <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
          Отправить сообщение
        </Button>
      </Box>
    </Container>
  );
};

export default Chat;
