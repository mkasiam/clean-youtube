import {
  Container,
  Typography,
  Grid,
  CardMedia,
  Box,
  Avatar,
} from "@mui/material";
import { useParams } from "react-router";
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
        justifyContent: "space-between",
        mt: 16,
        mb: 4,
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 4, flex: 1, padding: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <CardMedia
              component="img"
              image={playlistThumbnail.url}
              alt={playlistTitle}
              sx={{
                borderRadius: 2,
                height: 250,
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Typography variant="h6" sx={{ fontWeight: "bold", my: 1 }}>
              {playlistTitle}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Avatar sx={{ width: 40, height: 40 }}>
                {channelTitle?.[0]}
              </Avatar>
              <Typography variant="subtitle1">{channelTitle}</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              {playlistItems.length} videos
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
              {playlistDescription}
            </Typography>
          </Grid>
        </Grid>
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

export default PlayerPage;
