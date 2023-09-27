import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface FormAlertProps {
    isSnackbarOpen: boolean;
    setSnackbarOpen: (status: boolean) => void;
    autoHideDuration: number;
    snackbarMessage: string;
}

const FormAlert : React.FC<FormAlertProps> = ({isSnackbarOpen, setSnackbarOpen, autoHideDuration, snackbarMessage}) => {
    return (
        <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={autoHideDuration}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
        >
            <Alert severity="success">
                {snackbarMessage}
            </Alert>
        </Snackbar>
    )
}

export default FormAlert;
