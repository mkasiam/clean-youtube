import { Box, Container, Grid, Typography } from "@mui/material";
import { useStoreState } from "easy-peasy";
import { useParams } from "react-router";
import PlaylistItem from "./playlist-item";
import YouTube from "react-youtube";

const VideoItem = () => {
  const { playlistId, videoId } = useParams();

  const { data: playlists } = useStoreState((state) => state.playlists);
  const currentPlaylist = playlists[playlistId];

  if (!currentPlaylist) return <Typography>Playlist not found</Typography>;

  const { playlistId: currentPlaylistId, playlistItems = [] } = currentPlaylist;

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mt: 16,
        mb: 4,
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 4, flex: 1, padding: 2 }}>
        <h1>Video is coming soon...</h1>
        <YouTube videoId={videoId} />
      </Box>

      {/* Playlist Items */}
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 2,
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
    </Container>
  );
};

export default VideoItem;
