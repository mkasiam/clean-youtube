import { Avatar, Box, CardMedia, Typography, Button, Stack, Divider, Grid } from "@mui/material";
import { useOutletContext } from "react-router";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useStoreActions } from "easy-peasy";

const PlaylistDescription = ({ customContext }) => {
  const outletContext = useOutletContext();
  const context = customContext || outletContext || {};
  
  const {
    playlistId,
    playlistTitle,
    playlistDescription,
    playlistThumbnail,
    channelTitle,
    playlistItems,
  } = context;

  const { refreshPlaylistData } = useStoreActions((actions) => actions.playlists);

  const handleRefresh = () => {
    refreshPlaylistData(playlistId);
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Grid container spacing={4} alignItems="flex-start">
        {/* Thumbnail Column */}
        <Grid item xs={12} md={4} lg={3}>
          <Box sx={{ position: 'relative', width: '100%' }}>
            <CardMedia
              component="img"
              image={playlistThumbnail?.url}
              alt={playlistTitle}
              sx={{
                borderRadius: 4,
                aspectRatio: '16/9',
                objectFit: "cover",
                boxShadow: 10,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.02)' }
              }}
            />
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: 12, 
                right: 12, 
                bgcolor: 'rgba(0,0,0,0.8)', 
                color: '#fff', 
                px: 1.5, 
                py: 0.5, 
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Typography variant="caption" fontWeight={700}>{playlistItems?.length} VIDEOS</Typography>
            </Box>
          </Box>
        </Grid>

        {/* Details Column */}
        <Grid item xs={12} md={8} lg={9}>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-0.02em' }}>
            {playlistTitle}
          </Typography>

          <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 3 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'error.main' }}>
                {channelTitle?.[0]}
              </Avatar>
              <Typography variant="subtitle1" fontWeight={700}>
                {channelTitle}
              </Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              Updated 1 day ago
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              sx={{ 
                borderRadius: 50,
                px: 3,
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: 0
              }}
            >
              Sync Playlist
            </Button>
            <Button
              variant="outlined"
              sx={{ 
                borderRadius: 50,
                px: 3,
                textTransform: 'none',
                fontWeight: 700,
                borderColor: 'divider'
              }}
            >
              Share
            </Button>
          </Stack>

          <Typography 
            variant="body1" 
            sx={{ 
              color: "text.secondary", 
              whiteSpace: "pre-wrap",
              fontSize: '1rem',
              lineHeight: 1.6,
              maxWidth: '800px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {playlistDescription}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaylistDescription;
