import { Container, Typography, Grid, Box, Icon, Button } from "@mui/material";
import { Outlet, useParams } from "react-router";
import PlaylistItems from "./playlist-items";
import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PlayerPage = ({ playlists }) => {
  const { playlistId, videoId } = useParams();
  const currentPlaylist = playlists[playlistId];

  const {
    playlistId: currentPlaylistId,
    channelTitle,
    playlistTitle,
    playlistDescription,
    playlistThumbnail,
    playlistItems = [],
  } = currentPlaylist;

  const currentVideoIndex = playlistItems.findIndex(
    (item) => item.videoId === videoId,
  );

  const [videoIndex, setVideoIndex] = useState(currentVideoIndex || 0);
  const [togglePlaylistItems, setTogglePlaylistItems] = useState(true);

  const isVideoRoute = Boolean(videoId);

  if (!currentPlaylist) return <Typography>Playlist not found</Typography>;

  const getVideoIndex = (index) => {
    setVideoIndex(index);
  };

  const toggleSidebar = () => {
    setTogglePlaylistItems(!togglePlaylistItems);
  };

  return (
    <Container maxWidth="xl" sx={{ p: { xs: 0, sm: 2, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 3,
        }}
      >
        {/* VideoPlayer Section */}
        <Box
          sx={{
            flex: {
              xs: "1 1 100%",
              lg: togglePlaylistItems && isVideoRoute ? "2.5 1 0%" : "1 1 0%",
            },
            minWidth: 0,
          }}
        >
          <Outlet
            context={{
              channelTitle,
              playlistTitle,
              playlistDescription,
              playlistThumbnail,
              playlistItems,
              toggleSidebar, // Pass toggle down to VideoItem if needed
              togglePlaylistItems
            }}
          />
        </Box>

        {/* Playlist Sidebar Section */}
        {togglePlaylistItems && (
          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                lg: "1 1 0%",
              },
              maxWidth: { lg: '400px' },
              height: { lg: "calc(100vh - 40px)" },
              overflowY: { lg: "auto" },
              p: 1,
              bgcolor: 'background.paper',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.05)',
              position: 'sticky',
              top: 20,
            }}
          >
            {/* Playlist Header */}
            <Box sx={{ p: 2, mb: 1, borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <Typography variant="h6" fontWeight={700}>
                {playlistTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {channelTitle} • {videoIndex + 1} / {playlistItems.length}
              </Typography>
            </Box>

            <Grid container spacing={1} sx={{ mt: 1 }}>
              {playlistItems.map((item, index) => (
                <Grid item xs={12} key={item.videoId}>
                  <PlaylistItems
                    item={item}
                    index={index}
                    currentPlaylistId={currentPlaylistId}
                    getVideoIndex={getVideoIndex}
                    channelTitle={channelTitle}
                    compact={true}
                    active={item.videoId === videoId}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PlayerPage;
