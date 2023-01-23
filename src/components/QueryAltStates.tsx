import { ApolloError } from "@apollo/client";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

export const LoadingStateComponent = () => {
  const [showSnackbar, setShowSnackbar] = useState(true);

  return (
    <Snackbar
      open={showSnackbar}
      autoHideDuration={1000}
      onClose={() => setShowSnackbar(false)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="info">Loading...</Alert>
    </Snackbar>
  );
};

type ErrorStateComponentProps = {
  error: ApolloError | string;
};

export const ErrorStateComponent = ({ error }: ErrorStateComponentProps) => {
  const [showSnackbar, setShowSnackbar] = useState(true);

  return (
    <Snackbar
      open={showSnackbar}
      autoHideDuration={10000}
      onClose={() => setShowSnackbar(false)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="error">
        Error: {typeof error === "string" ? error : error.message}!
      </Alert>
    </Snackbar>
  );
};
