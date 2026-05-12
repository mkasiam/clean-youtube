import { useState, useContext, useEffect } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useParams, Outlet } from "react-router";
import PlaylistItems from "./playlist-items";
import PlaylistDescription from "./playlist-description";
import { ThemeContext } from "../../App";

const PlayerPage = ({ playlists }) => {
  const { playlistId, videoId } = useParams();
  const { mode } = useContext(ThemeContext);
  const theme = useTheme();
  const currentPlaylist = playlists[playlistId];

  if (!currentPlaylist) return <Typography sx={{ p: 4 }}>Playlist not found</Typography>;

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

  useEffect(() => {
    if (currentVideoIndex !== -1) {
      setVideoIndex(currentVideoIndex);
    }
  }, [currentVideoIndex]);

  const getVideoIndex = (index) => {
    setVideoIndex(index);
  };

  const toggleSidebar = () => {
    setTogglePlaylistItems(!togglePlaylistItems);
  };

  const isZenMode = !togglePlaylistItems;
  const isVideoView = Boolean(videoId);

  return (
    <Box sx={{ 
      width: '100%', 
      height: 'auto', 
      overflowX: 'hidden',
      position: 'relative',
      bgcolor: 'background.default'
    }}>
      {/* 1. PLAYLIST OVERVIEW VIEW (33/67 Split) */}
      {!isVideoView && (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, height: '100%' }}>
          {/* Left: Description (33%) */}
          <Box sx={{ 
            flex: { lg: '33 1 0%' }, 
            maxWidth: { lg: '33.33%' },
            p: 4, 
            borderRight: { lg: '1px solid' },
            borderColor: 'divider',
            bgcolor: 'background.paper',
            height: { lg: 'calc(100vh - 64px)' },
            overflowY: 'auto'
          }}>
            <PlaylistDescription 
              customContext={{
                playlistId: currentPlaylistId,
                channelTitle,
                playlistTitle,
                playlistDescription,
                playlistThumbnail,
                playlistItems,
                toggleSidebar,
                togglePlaylistItems
              }} 
            />
          </Box>

          {/* Right: Videos Grid (67%) */}
          <Box sx={{ 
            flex: { lg: '67 1 0%' }, 
            p: 4, 
            height: { lg: 'calc(100vh - 64px)' },
            overflowY: 'auto'
          }}>
            <Typography variant="h5" fontWeight={800} sx={{ mb: 4 }}>Playlist Videos</Typography>
            <Grid container spacing={3}>
              {playlistItems.map((item, index) => (
                <Grid item xs={12} sm={6} md={6} xl={4} key={item.videoId}>
                  <PlaylistItems
                    item={item}
                    index={index}
                    currentPlaylistId={currentPlaylistId}
                    getVideoIndex={getVideoIndex}
                    channelTitle={channelTitle}
                    compact={false}
                    active={false}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}

      {/* 2. VIDEO PLAYER VIEW (Theater Mode Compatible) */}
      {isVideoView && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            width: '100%',
            minHeight: 'calc(100vh - 64px)'
          }}
        >
          {/* Main Content Area (Video + Details Below) */}
          <Box
            sx={{
              flex: togglePlaylistItems ? { lg: "3 1 0%" } : "1 1 100%",
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.default'
            }}
          >
            {/* Video Section */}
            <Box sx={{ 
              width: '100%', 
              bgcolor: '#000', 
              aspectRatio: '16/9'
            }}>
              <Outlet
                context={{
                  playlistId: currentPlaylistId,
                  channelTitle,
                  playlistTitle,
                  playlistDescription,
                  playlistThumbnail,
                  playlistItems,
                  toggleSidebar,
                  togglePlaylistItems,
                  videoIndex,
                  getVideoIndex
                }}
              />
            </Box>

            {/* Details Section (Always visible below) */}
            {/* Handled by VideoItem internal rendering */}
          </Box>

          {/* Playlist Sidebar (Right) - Toggleable */}
          {togglePlaylistItems && (
            <Box
              sx={{
                flex: { lg: "1 1 0%" },
                maxWidth: { lg: '420px' },
                height: { xs: 'auto', lg: "calc(100vh - 64px)" },
                overflowY: "auto",
                bgcolor: 'background.paper',
                borderLeft: '1px solid',
                borderColor: 'divider',
                position: 'sticky',
                top: 64
              }}
            >
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1" fontWeight={700} noWrap>{playlistTitle}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {channelTitle} • {videoIndex + 1} / {playlistItems.length}
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                  {playlistItems.map((item, index) => (
                    <PlaylistItems
                      key={item.videoId}
                      item={item}
                      index={index}
                      currentPlaylistId={currentPlaylistId}
                      getVideoIndex={getVideoIndex}
                      channelTitle={channelTitle}
                      compact={true}
                      active={item.videoId === videoId}
                    />
                  ))}
                </Grid>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PlayerPage;
