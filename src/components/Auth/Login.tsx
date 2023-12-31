import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';

import FormAlert from './FormAlert';
import AuthForm from './AuthForm';
import store from '../../store';

const SignIn: React.FC = () => {
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const headers = {
      username: data.get('login'),
      password: data.get('password'),
    };

    try {
      await store.login(headers);

      setSnackbarMessage('Успешная авторизация');
      setSnackbarOpen(true);

      setTimeout(() => navigate('/chats'), 700);
    } catch (error) {
      console.error(error);
    }
  };

  const loginFields = (
    <>
      <Grid item xs={12}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="login"
          label="Логин"
          name="login"
          autoComplete="email"
          autoFocus
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          id="password"
          autoComplete="current-password"
        />
      </Grid>
    </>
  );

  return (
    <Container component="main" maxWidth="xs" sx={{ width: '150%' }}>
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
          Авторизация
        </Typography>
        <AuthForm
          handleSubmit={handleSubmit}
          buttonText="Войти"
          formFields={loginFields}
        />
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Забыли пароль?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/reg/" variant="body2">
              {'К регистрации'}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <FormAlert
        isSnackbarOpen={isSnackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        autoHideDuration={6000}
        snackbarMessage={snackbarMessage}
      />
    </Container>
  );
};

export default SignIn;
