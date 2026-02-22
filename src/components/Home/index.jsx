import { useStoreState } from "easy-peasy";
import Playlists from "./playlists";
import { Container } from "@mui/material";

const HomeLayout = () => {
  const playlists = useStoreState((state) => state.playlists.data);
  const recentPlaylistIds = useStoreState((state) => state.recents.items);
  const favoritePlaylistIds = useStoreState((state) => state.favorites.items);

  const playlistArray = Object.values(playlists);
  const recentPlaylistsArray = recentPlaylistIds.map(
    (playlistId) => playlists[playlistId],
  );
  const favoritePlaylistsArray = favoritePlaylistIds.map(
    (playlistId) => playlists[playlistId],
  );

  return (
    <Container maxWidth="lg" sx={{ my: { xs: 3, sm: 6, md: 14, lg: 16 } }}>
      {recentPlaylistsArray.length > 0 && (
        <Playlists
          playlistArrays={recentPlaylistsArray}
          recent={true}
        ></Playlists>
      )}
      {favoritePlaylistsArray.length > 0 && (
        <Playlists
          playlistArrays={favoritePlaylistsArray}
          favorite={true}
        ></Playlists>
      )}
      <Playlists playlistArrays={playlistArray}></Playlists>
    </Container>
  );
};

export default HomeLayout;
