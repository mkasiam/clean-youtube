import { Container, Grid } from "@mui/material";
import PlaylistCardItem from "../playlist-card-item";

const Home = ({ playlistArrays }) => {
  return (
    <Container maxWidth="lg" sx={{ my: { xs: 3, sm: 6, md: 14, lg: 18 } }}>
      {playlistArrays.length > 0 && (
        <Grid
          container
          spacing={{ xs: 1.5, sm: 2, md: 3, lg: 4 }}
          sx={{ alignItems: "stretch" }}
        >
          {playlistArrays?.map((playlist) => (
            <Grid
              item
              key={playlist.playlistId}
              xs={12} // 1 column on mobile
              sm={6} // 2 columns on tablet
              md={6} // 2 columns on medium
              lg={4} // 3 columns on large
              xl={3} // 4 columns on XL screens
              sx={{
                display: "flex",
              }}
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
