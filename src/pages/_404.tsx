import { Button, Container, Typography } from "@mui/material";

export const NotFoundPage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2">Page not found.</Typography>
      <Button href="/" variant="contained">
        Go back home.
      </Button>
    </Container>
  );
};
