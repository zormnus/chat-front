import React from 'react'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

export default function Welcome() {
    const to = localStorage.getItem('accessToken') ? 'chats/' : 'auth/';
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
