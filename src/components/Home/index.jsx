import { useStoreState } from "easy-peasy";
import Playlists from "./playlists";
import { Container, Typography, Box } from "@mui/material";

const HomeLayout = () => {
  const playlists = useStoreState((state) => state.playlists.data);
  const playlistArray = Object.values(playlists);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Recommended Playlists
        </Typography>
      </Box>
      <Playlists playlistArrays={playlistArray}></Playlists>
    </Container>
  );
};

export default HomeLayout;
