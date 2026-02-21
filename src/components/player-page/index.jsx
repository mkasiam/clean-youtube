import { Container, Typography, Grid, Box } from "@mui/material";
import { Outlet, useParams } from "react-router";
import PlaylistItem from "./playlist-item";

const PlayerPage = ({ playlists }) => {
  const { playlistId } = useParams();
  const currentPlaylist = playlists[playlistId];

  if (!currentPlaylist) return <Typography>Playlist not found</Typography>;

  const {
    playlistId: currentPlaylistId,
    channelTitle,
    playlistTitle,
    playlistDescription,
    playlistThumbnail,
    playlistItems = [],
  } = currentPlaylist;

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        gap: 2,
        mt: 16,
        mb: 4,
      }}
    >
      <Box sx={{ flex: { xs: "1 1 100%", md: 1 } }}>
        <Outlet
          context={{
            channelTitle,
            playlistTitle,
            playlistDescription,
            playlistThumbnail,
            playlistItems,
          }}
        />
      </Box>

      {/* Playlist Items */}
      <Box sx={{ flex: { xs: "1 1 100%", md: 2 } }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {playlistItems.map((item, index) => (
            <PlaylistItem
              key={item.videoId}
              item={item}
              index={index}
              currentPlaylistId={currentPlaylistId}
            />
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default PlayerPage;
