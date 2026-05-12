import { useStoreState } from "easy-peasy";
import Playlists from "../Home/playlists";
import { Container, Typography, Box } from "@mui/material";

const FavoritesPage = () => {
  const playlists = useStoreState((state) => state.playlists.data);
  const favoritePlaylistIds = useStoreState((state) => state.favorites.items);

  const favoritePlaylistsArray = favoritePlaylistIds.map(
    (playlistId) => playlists[playlistId],
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      {favoritePlaylistsArray.length > 0 ? (
        <Playlists
          playlistArrays={favoritePlaylistsArray}
          favorite={true}
        />
      ) : (
        <Typography variant="body1" color="text.secondary">
          You haven't favorited any playlists yet.
        </Typography>
      )}
    </Container>
  );
};

export default FavoritesPage;
