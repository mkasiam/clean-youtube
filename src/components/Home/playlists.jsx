import { Container, Grid, Typography } from "@mui/material";
import PlaylistCardItem from "../playlist-card-item";

const Playlists = ({
  playlistArrays = [],
  recent = false,
  favorite = false,
}) => {
  return (
    <Container sx={{ mb: 4, px: { xs: 1, sm: 2 } }}>
      {playlistArrays.length > 0 && (
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "flex-start",
          }}
        >
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

export default Playlists;
