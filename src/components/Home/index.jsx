import { Container, Grid } from "@mui/material";
import PlaylistCardItem from "../playlist-card-item";

const Home = ({ playlistArrays }) => {
  return (
    <Container maxWidth="lg" sx={{ my: { xs: 6, md: 16 } }}>
      {playlistArrays.length > 0 && (
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{ alignItems: "stretch" }}
        >
          {playlistArrays?.map((playlist) => (
            <Grid
              item
              key={playlist.playlistId}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: "flex" }}
            >
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
