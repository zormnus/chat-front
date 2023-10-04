import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import checkToken from '../../api/checkToken';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Chat = () => {
  const { chatId } = useParams();

  const socket = new WebSocket(`ws://localhost:8000/ws/chat/chat${chatId}/`);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getChat = async () => {
      const isTokenValid = await checkToken();

      if (isTokenValid) {
        socket.onopen = () => {
          console.log('Соединение установлено');
        };

        socket.onclose = () => {
          console.log('Соединение закрыто');
        };

        socket.onmessage = (data: MessageEvent<string>) => {
          console.log(data);
        };

        socket.onerror = (error) => {
          console.log(error);
        };
      } else {
        navigate('/auth');
      }
    };

    getChat();
  }, []);

  const [messages, setMessages] = React.useState<string[]>([]);
  const [value, setValue] = React.useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onMessageEnter = () => {
    setValue('');
  };

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
        <TextField
          value={value}
          onChange={onChange}
          placeholder="Введите сообщение"
          sx={{ width: '100%' }}
        />
        <Button
          onClick={onMessageEnter}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mb: 2 }}
        >
          Отправить сообщение
        </Button>
      </Box>
    </Container>
  );
};

export default Chat;
