import { useStoreState } from "easy-peasy";
import Playlists from "./playlists";
import { Container, Typography, Box } from "@mui/material";

const HomeLayout = () => {
  const playlists = useStoreState((state) => state.playlists.data);
  const playlistArray = Object.values(playlists).reverse();

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Playlists playlistArrays={playlistArray}></Playlists>
    </Container>
  );
};

export default HomeLayout;
