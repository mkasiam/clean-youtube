import { Container, Grid } from "@mui/material";
import PlaylistCardItem from "../playlist-card-item";

const Home = ({ playlistArrays }) => {
//   const playlists = useStoreActions((state) => state.playlists);

//   useEffect(() => {
//     playlists.getPlaylistData(playlistId);
//   }, []);

  return (
    <Container maxWidth="lg" sx={{ my: 16 }}>
      {playlistArrays.length > 0 && (
        <Grid container sx={{ alignItems: "stretch" }}>
          {playlistArrays?.map((playlist) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={playlist.playlistId}>
              <PlaylistCardItem
                playlistId={playlist.playlistId}
                playlistThumbnail={playlist.playlistThumbnail}
                playlistTitle={playlist.playlistTitle}
                channelTitle={playlist.channelTitle}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
