import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import { useParams } from "react-router";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const PlayerPage = ({ playlists }) => {
  const { playlistId } = useParams();
  const currentPlaylist = playlists[playlistId];

  if (!currentPlaylist) return <Typography>Playlist not found</Typography>;

  const {
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
        // alignItems: "center",
        mt: 16,
        mb: 4,
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <CardMedia
              component="img"
              image={playlistThumbnail.url}
              alt={playlistTitle}
              sx={{ borderRadius: 2, height: 250, objectFit: "cover" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
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
      <Grid container spacing={2}>
        {playlistItems.map((item, index) => (
          <Grid item xs={12} key={item.id}>
            <Card sx={{ display: "flex", "&:hover": { bgcolor: "#f1e7e7" } }}>
              <CardMedia
                component="img"
                image={item.thumbnail.url}
                alt={item.title}
                sx={{ width: 200, height: 112, objectFit: "cover" }}
              />
              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Chip label={index + 1} size="small" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: "500" }}>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {item.channelTitle}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PlayerPage;
