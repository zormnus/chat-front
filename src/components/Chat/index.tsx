import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Chat = () => {
  const { chatId } = useParams();

  const socket = new WebSocket(`ws://localhost:8000/ws/chat/chat${chatId}/`);
  const navigate = useNavigate();

  const [messages, setMessages] = React.useState<string[]>([]);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
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
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onMessageEnter = () => {
    setValue('');

    socket.send(value);
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
          onKeyDown={(e) => {
            if (e.code === 'Enter') onMessageEnter();
          }}
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
