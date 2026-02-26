import { Container, Grid, Typography } from "@mui/material";
import PlaylistCardItem from "../playlist-card-item";

const Playlists = ({
  playlistArrays = [],
  recent = false,
  favorite = false,
}) => {
  return (
    <Container sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ fontWeight: 600, mb: 1, ml: 1 }}
      >
        {recent
          ? `Recent Playlists `
          : favorite
            ? `Favorite Playlists `
            : `Playlists `}
        ({playlistArrays.length})
      </Typography>

      {playlistArrays.length > 0 && (
        <Grid
          container
          spacing={1}
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
