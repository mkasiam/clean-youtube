import { useStoreState, useStoreActions } from "easy-peasy";
import Playlists from "../Home/playlists";
import { Container, Typography, Box, Tabs, Tab, Grid, Button, Paper } from "@mui/material";
import { useState } from "react";
import VideoCard from "../UI/VideoCard";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const playlists = useStoreState((state) => state.playlists.data);
  const recentPlaylistIds = useStoreState((state) => state.recents.items);
  const progressItems = useStoreState((state) => state.progress.items);
  const clearProgress = useStoreActions((actions) => actions.progress.clearProgress);

  const recentPlaylistsArray = recentPlaylistIds
    .map((playlistId) => playlists[playlistId])
    .filter(Boolean);

  const watchHistoryVideos = Object.values(progressItems)
    .sort((a, b) => b.lastWatched - a.lastWatched);

  const handleClearAllVideos = () => {
    if (window.confirm("Are you sure you want to clear your entire video watch history?")) {
      clearProgress();
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3, pb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <HistoryIcon sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h4" fontWeight={800}>
          Watch History
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '1rem',
              color: 'text.secondary',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
              pb: 1.5,
              '&.Mui-selected': {
                color: 'primary.main',
              }
            }
          }}
        >
          <Tab icon={<PlayCircleIcon sx={{ fontSize: 20 }} />} label="Watched Videos" />
          <Tab icon={<PlaylistPlayIcon sx={{ fontSize: 22 }} />} label="Played Playlists" />
        </Tabs>
      </Box>

      {/* TAB CONTENT: WATCHED VIDEOS */}
      {activeTab === 0 && (
        <Box>
          {watchHistoryVideos.length > 0 ? (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteSweepIcon />}
                  onClick={handleClearAllVideos}
                  sx={{
                    borderRadius: 50,
                    textTransform: 'none',
                    fontWeight: 700,
                  }}
                >
                  Clear All Video History
                </Button>
              </Box>
              <Grid container spacing={3}>
                {watchHistoryVideos.map((video) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={video.videoId}>
                    <VideoCard video={video} />
                  </Grid>
                ))}
              </Grid>
            </>
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
                No video history yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Videos you watch will appear here, showing your progress and completion status.
              </Typography>
            </Paper>
          )}
        </Box>
      )}

      {/* TAB CONTENT: PLAYED PLAYLISTS */}
      {activeTab === 1 && (
        <Box>
          {recentPlaylistsArray.length > 0 ? (
            <Playlists playlistArrays={recentPlaylistsArray} recent={true} />
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
                No playlist history yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Playlists you view will be listed here.
              </Typography>
            </Paper>
          )}
        </Box>
      )}
    </Container>
  );
};

export default HistoryPage;
