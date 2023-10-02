// Registration.tsx
import React, { FormEvent, useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AuthForm from './AuthForm';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import FormAlert from "./FormAlert";

const Registration: React.FC = () => {
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const headers = {
            first_name: data.get('name'),
            last_name: data.get('secondname'),
            email: data.get('email'),
            username: data.get('login'),
            password: data.get('password')
        }
        try {
            await axios.post('http://localhost:8000/user/api/reg/', headers);
            console.log('Пользователь зарегистрирован');
            setSnackbarMessage('Регистрация успешна');
            setSnackbarOpen(true);
        } catch (error) {
            console.error(error);
        }
    };

    const regFields = (
        <>
            <Grid item xs={12}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Имя"
                    name="name"
                    autoComplete="text"
                    autoFocus
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="secondname"
                    label="Фамилия"
                    name="secondname"
                    autoComplete="text"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Эл. почта"
                    name="email"
                    autoComplete="email"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="login"
                    label="Логин"
                    name="login"
                    autoComplete="text"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Пароль"
                    name="password"
                    autoComplete="password"
                />
            </Grid>
        </>
    )

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <AuthForm handleSubmit={handleSubmit} buttonText="Создать аккаунт" formFields={regFields}/>
            </Box>
            <FormAlert isSnackbarOpen={isSnackbarOpen} setSnackbarOpen={setSnackbarOpen} autoHideDuration={6000} snackbarMessage={snackbarMessage}/>
        </Container>
    );
}

export default Registration;
