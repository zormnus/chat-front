import React from 'react'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

export default function Welcome() {
    const to = localStorage.getItem('accessToken') ? 'chats/' : 'auth/';
    const socket = new WebSocket('ws://localhost:8000/ws/chat/room17/');
    socket.addEventListener('open', (event) => {
        socket.send(JSON.stringify({'message': "Hello, server!"}));
    });

    socket.addEventListener('message', (event) => {
        event.preventDefault();
        console.log(event.data);
    });

    return (
        <Box
            sx = {{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
                Тест
            </Typography>
            <Button variant="contained"><a href={to}>Начать</a></Button>
        </Box>
    )
}
