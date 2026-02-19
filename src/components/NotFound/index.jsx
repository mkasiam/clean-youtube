import { Container, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 16 }}>
      <Typography variant="h2" align="center">
        404 Page Not Found
      </Typography>
    </Container>
  );
};

export default NotFound;
