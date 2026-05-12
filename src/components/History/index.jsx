import { useStoreState } from "easy-peasy";
import Playlists from "../Home/playlists";
import { Container, Typography, Box } from "@mui/material";

const HistoryPage = () => {
  const playlists = useStoreState((state) => state.playlists.data);
  const recentPlaylistIds = useStoreState((state) => state.recents.items);

  const recentPlaylistsArray = recentPlaylistIds.map(
    (playlistId) => playlists[playlistId],
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      {recentPlaylistsArray.length > 0 ? (
        <Playlists
          playlistArrays={recentPlaylistsArray}
          recent={true}
        />
      ) : (
        <Typography variant="body1" color="text.secondary">
          Your watch history is empty.
        </Typography>
      )}
    </Container>
  );
};

export default HistoryPage;
