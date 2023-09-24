import React, { FormEvent, ReactNode } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

interface AuthFormProps {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    buttonText: string;
    formFields: ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ handleSubmit, buttonText, formFields }) => {
    return (
        <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
                {formFields}
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                {buttonText}
            </Button>
        </form>
    );
}

export default AuthForm;
