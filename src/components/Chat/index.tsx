import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import authStore from '../../store';

const Chat = () => {
  const { chatId } = useParams();

  const navigate = useNavigate();

  const [messages, setMessages] = React.useState<string[]>([]);
  const [value, setValue] = React.useState('');

  const ws = React.useRef<WebSocket | null>(null);
  const scrollBox = React.useRef<HTMLDivElement>(null);

  const getData = () => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      const message = e.data;

      setMessages((prev) => [...prev, message]);
    };
  };

  React.useLayoutEffect(() => {
    scrollBox.current?.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  React.useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/ws/chat/chat${chatId}/`);
    ws.current.onopen = () => console.log('Соединине открыто');
    ws.current.onclose = () => {
      console.log('Соеденинеие закрыто');
      navigate('/chats');
    };

    ws.current.onerror = (error) => console.log(error);

    getData();
  }, [ws]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onMessageEnter = () => {
    if (!ws.current || !value) return;

    ws.current.send(value);

    setValue('');
  };

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          height: '100vh',
          backgroundColor: '#edd4fc',
          color: 'white',
        }}
      >
        <Box
          ref={scrollBox}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            gap: '1rem',
            py: 5,
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                color: 'black',
                mx: 5,
              }}
            >
              <Typography sx={{ fontSize: '1.5rem', color: 'primary.light' }}>
                {authStore.username}
              </Typography>
              <Typography component="p">{msg}</Typography>
            </Box>
          ))}
        </Box>
        <Box>
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
          >
            Отправить сообщение
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
