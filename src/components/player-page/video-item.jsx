import { Box, Typography, Container, Button, Stack, Avatar, IconButton, Divider } from "@mui/material";
import { useParams, useOutletContext } from "react-router";
import { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import useValidPlaylist from "../../hooks/useValidPlaylist.jsx";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';

const VideoItem = () => {
  const { playlistId, videoId } = useParams();
  const { getVideoDetails } = useValidPlaylist();
  const { toggleSidebar, togglePlaylistItems, channelTitle } = useOutletContext();
  const playerRef = useRef(null);

  const { title, videoDescription } =
    getVideoDetails(playlistId, videoId) || {};

  const [expanded, setExpanded] = useState(false);
  const [cinemaMode, setCinemaMode] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!playerRef.current) return;
      const player = playerRef.current.internalPlayer;

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          player.getPlayerState().then(state => {
            state === 1 ? player.pauseVideo() : player.playVideo();
          });
          break;
        case "j":
          player.getCurrentTime().then(time => player.seekTo(time - 10));
          break;
        case "l":
          player.getCurrentTime().then(time => player.seekTo(time + 10));
          break;
        case "t":
          setCinemaMode(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const changeSpeed = (speed) => {
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(speed);
      setPlaybackSpeed(speed);
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      transition: 'all 0.3s ease',
      ...(cinemaMode && {
        maxWidth: '100% !important',
        mx: -3, // Offset the padding from MainLayout
        width: 'calc(100% + 48px)',
        bgcolor: '#0f0f0f',
        color: '#fff',
        pb: 4
      })
    }}>
      {/* Immersive Video Container */}
      <Box
        sx={{
          position: "relative",
          paddingBottom: cinemaMode ? "50%" : "56.25%",
          height: 0,
          overflow: "hidden",
          maxWidth: cinemaMode ? "100%" : "1280px",
          mx: "auto",
          backgroundColor: "#000",
          borderRadius: cinemaMode ? 0 : { xs: 0, sm: 3 },
          boxShadow: cinemaMode ? 0 : 6,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          "& iframe": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          },
        }}
      >
        <YouTube
          videoId={videoId}
          opts={{
            height: "100%",
            width: "100%",
            playerVars: {
              autoplay: 1,
              rel: 0,
              controls: 1,
              modestbranding: 1,
              fs: 1,
              iv_load_policy: 3,
              autohide: 1
            },
          }}
          onReady={(event) => {
            playerRef.current = event.target;
            const savedTime = localStorage.getItem(`video-time-${videoId}`);
            if (savedTime) {
              event.target.seekTo(parseFloat(savedTime));
            }
          }}
          onStateChange={(event) => {
            if (event.data === 1 || event.data === 2) {
              const currentTime = event.target.getCurrentTime();
              localStorage.setItem(`video-time-${videoId}`, currentTime);
            }
          }}
        />
      </Box>

      {/* Control & Info Area */}
      <Container maxWidth={cinemaMode ? "xl" : "lg"} sx={{ mt: 3 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mb: 2, color: cinemaMode ? '#fff' : 'inherit' }}
        >
          {title || "Video Title"}
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
            <Avatar sx={{ bgcolor: 'error.main' }}>{channelTitle?.charAt(0)}</Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ color: cinemaMode ? '#fff' : 'inherit' }}>
                {channelTitle}
              </Typography>
              <Typography variant="body2" color={cinemaMode ? 'grey.500' : 'text.secondary'}>
                1.2M subscribers
              </Typography>
            </Box>
            <Button variant="contained" sx={{ borderRadius: 50, px: 3, textTransform: 'none', bgcolor: cinemaMode ? '#fff' : '#0f0f0f', color: cinemaMode ? '#000' : '#fff' }}>
              Subscribe
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: 'flex-end' }}>
            <Box sx={{ display: 'flex', bgcolor: cinemaMode ? 'rgba(255,255,255,0.1)' : 'action.hover', borderRadius: 50 }}>
              <Button startIcon={<ThumbUpOutlinedIcon />} sx={{ px: 2, color: cinemaMode ? '#fff' : 'inherit' }}>12K</Button>
              <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
              <Button sx={{ px: 2, color: cinemaMode ? '#fff' : 'inherit' }}><ThumbDownOutlinedIcon /></Button>
            </Box>

            <Button 
              onClick={() => setCinemaMode(!cinemaMode)}
              startIcon={<AspectRatioIcon />}
              sx={{ 
                bgcolor: cinemaMode ? 'rgba(255,255,255,0.1)' : 'action.hover', 
                borderRadius: 50, 
                color: cinemaMode ? '#fff' : 'inherit',
                textTransform: 'none',
                px: 2
              }}
            >
              {cinemaMode ? "Exit Cinema" : "Cinema Mode"}
            </Button>

            <IconButton onClick={toggleSidebar} sx={{ color: cinemaMode ? '#fff' : 'inherit', bgcolor: cinemaMode ? 'rgba(255,255,255,0.1)' : 'action.hover' }}>
              <ViewSidebarOutlinedIcon />
            </IconButton>
          </Stack>
        </Stack>

        {/* Playback Speed Quick Actions */}
        <Stack direction="row" spacing={1} sx={{ mb: 3, overflowX: 'auto' }}>
          <Typography variant="caption" sx={{ alignSelf: 'center', mr: 1, color: cinemaMode ? 'grey.500' : 'text.secondary' }}>SPEED:</Typography>
          {[0.5, 1, 1.25, 1.5, 2].map((speed) => (
            <Button
              key={speed}
              size="small"
              onClick={() => changeSpeed(speed)}
              variant={playbackSpeed === speed ? "contained" : "outlined"}
              sx={{ 
                minWidth: 50, 
                borderRadius: 2, 
                textTransform: 'none',
                borderColor: cinemaMode ? 'rgba(255,255,255,0.2)' : 'divider',
                color: cinemaMode && playbackSpeed !== speed ? '#fff' : 'inherit'
              }}
            >
              {speed}x
            </Button>
          ))}
        </Stack>

        <Box sx={{ 
          bgcolor: cinemaMode ? 'rgba(255,255,255,0.05)' : 'action.hover', 
          p: 2, 
          borderRadius: 3,
          color: cinemaMode ? '#eee' : 'inherit'
        }}>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
            {expanded ? videoDescription : videoDescription?.slice(0, 200) + "..."}
          </Typography>
          <Button size="small" onClick={() => setExpanded(!expanded)} sx={{ mt: 1, color: cinemaMode ? 'primary.light' : 'primary.main' }}>
            {expanded ? "Show less" : "Show more"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default VideoItem;
