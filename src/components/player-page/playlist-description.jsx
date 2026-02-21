import { Avatar, Box, CardMedia, Grid, Typography } from "@mui/material";
import { useOutletContext } from "react-router";

const PlaylistDescription = () => {
  const {
    playlistTitle,
    playlistDescription,
    playlistThumbnail,
    channelTitle,
    playlistItems,
  } = useOutletContext();

  return (
    <Box sx={{ mb: 4, flex: 1, padding: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <CardMedia
            component="img"
            image={playlistThumbnail.url}
            alt={playlistTitle}
            sx={{
              borderRadius: 2,
              objectFit: "cover",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Typography variant="h6" sx={{ fontWeight: "bold", my: 1 }}>
            {playlistTitle}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Avatar sx={{ width: 40, height: 40 }}>{channelTitle?.[0]}</Avatar>
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
  );
};

export default PlaylistDescription;
