import { useStoreState, useStoreActions } from "easy-peasy";
import Playlists from "./playlists";
import { Container, Typography, Box, Grid, Paper, Button, Divider, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestoreIcon from "@mui/icons-material/Restore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import VideoCard from "../UI/VideoCard";

const formatDuration = (seconds) => {
  if (!seconds) return "";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [
    h > 0 ? h : null,
    h > 0 ? String(m).padStart(2, '0') : m,
    String(s).padStart(2, '0')
  ].filter(Boolean).join(':');
};

const HomeLayout = () => {
  const playlists = useStoreState((state) => state.playlists.data);
  const playlistArray = Object.values(playlists).reverse();

  // Progress states
  const progressItems = useStoreState((state) => state.progress.items);
  const lastWatchedVideoId = useStoreState((state) => state.progress.lastWatchedVideoId);
  const clearProgress = useStoreActions((actions) => actions.progress.clearProgress);

  const lastWatchedVideo = lastWatchedVideoId ? progressItems[lastWatchedVideoId] : null;

  // Filter progress items
  const allProgressVideos = Object.values(progressItems).sort((a, b) => b.lastWatched - a.lastWatched);
  
  // Continue Watching: in progress (percentage > 0 and not fully completed), excluding the absolute last watched which is spotlighted
  const continueWatchingVideos = allProgressVideos.filter(
    (v) => !v.completed && v.percentage > 0 && v.videoId !== lastWatchedVideoId
  );

  // Completed recently
  const completedVideos = allProgressVideos.filter((v) => v.completed);

  const handleDismissSpotlight = (e) => {
    e.preventDefault();
    if (lastWatchedVideoId) {
      clearProgress(lastWatchedVideoId);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3, pb: 6 }}>
      {/* 1. LAST WATCHED SPOTLIGHT BANNER */}
      {lastWatchedVideo && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" fontWeight={800} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <RestoreIcon color="primary" /> Lastly Seen Video
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 4 },
              borderRadius: 4,
              bgcolor: 'action.hover',
              border: '1px solid',
              borderColor: 'divider',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                bgcolor: 'primary.main',
              }
            }}
          >
            {/* Dismiss Button */}
            <Tooltip title="Clear session">
              <IconButton
                onClick={handleDismissSpotlight}
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': { bgcolor: 'error.main', color: '#fff' }
                }}
                size="small"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Grid container spacing={4} alignItems="center">
              {/* Thumbnail */}
              <Grid item xs={12} md={5} lg={4}>
                <Box
                  component={Link}
                  to={`/player/${lastWatchedVideo.playlistId}/${lastWatchedVideo.videoId}`}
                  sx={{
                    display: 'block',
                    position: 'relative',
                    aspectRatio: '16/9',
                    borderRadius: 3,
                    overflow: 'hidden',
                    bgcolor: '#000',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      '& img': { transform: 'scale(1.03)' },
                      '& .spotlight-play-overlay': { opacity: 1 }
                    }
                  }}
                >
                  {lastWatchedVideo.thumbnail?.url && (
                    <img
                      src={lastWatchedVideo.thumbnail.url}
                      alt={lastWatchedVideo.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  )}
                  {/* Play Overlay */}
                  <Box
                    className="spotlight-play-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      bgcolor: 'rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <PlayArrowIcon sx={{ color: '#fff', fontSize: 60 }} />
                  </Box>

                  {/* Duration Badge */}
                  {lastWatchedVideo.duration > 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        bgcolor: 'rgba(0,0,0,0.85)',
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        px: 0.8,
                        py: 0.2,
                        borderRadius: 1,
                      }}
                    >
                      {formatDuration(lastWatchedVideo.duration)}
                    </Box>
                  )}

                  {/* Progress Bar */}
                  {lastWatchedVideo.percentage > 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: 5,
                        bgcolor: 'rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      <Box
                        sx={{
                          width: `${lastWatchedVideo.percentage}%`,
                          height: '100%',
                          bgcolor: 'primary.main',
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Grid>

              {/* Details & Action */}
              <Grid item xs={12} md={7} lg={8}>
                <Box sx={{ pr: { md: 4 } }}>
                  <Typography variant="overline" color="primary" fontWeight={800} sx={{ letterSpacing: 1.5 }}>
                    RESUME YOUR LAST WATCHED SESSION
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    sx={{
                      mt: 1,
                      mb: 1.5,
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      color: 'text.primary',
                    }}
                  >
                    {lastWatchedVideo.title}
                  </Typography>
                  
                  <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
                    {lastWatchedVideo.channelTitle}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                    Watched {lastWatchedVideo.percentage}% • {Math.round(lastWatchedVideo.currentTime)}s of {Math.round(lastWatchedVideo.duration)}s
                  </Typography>

                  <Button
                    component={Link}
                    to={`/player/${lastWatchedVideo.playlistId}/${lastWatchedVideo.videoId}`}
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    sx={{
                      borderRadius: 50,
                      px: 4,
                      py: 1.5,
                      fontWeight: 800,
                      textTransform: 'none',
                      fontSize: '1rem',
                      boxShadow: '0 4px 14px rgba(255, 0, 0, 0.3)',
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(255, 0, 0, 0.4)',
                      }
                    }}
                  >
                    Resume Playback
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}

      {/* 2. CONTINUE WATCHING SHELF */}
      {continueWatchingVideos.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            Continue Watching
          </Typography>
          <Grid container spacing={3}>
            {continueWatchingVideos.slice(0, 4).map((video) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video.videoId}>
                <VideoCard video={video} />
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ mt: 4 }} />
        </Box>
      )}

      {/* 3. COMPLETED RECENTLY SHELF */}
      {completedVideos.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: '1.25rem' }} /> Completed Recently
          </Typography>
          <Grid container spacing={3}>
            {completedVideos.slice(0, 4).map((video) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video.videoId}>
                <VideoCard video={video} />
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ mt: 4 }} />
        </Box>
      )}

      {/* 4. PLAYLISTS SECTION */}
      <Box>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 2.5 }}>
          My Playlists
        </Typography>
        {playlistArray.length > 0 ? (
          <Playlists playlistArrays={playlistArray} />
        ) : (
          <Paper
            variant="outlined"
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 4,
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="body1" color="text.secondary" fontWeight={600} sx={{ mb: 1 }}>
              No Playlists Found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click the "Add Playlist" button in the navigation bar to import playlists from YouTube.
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default HomeLayout;
