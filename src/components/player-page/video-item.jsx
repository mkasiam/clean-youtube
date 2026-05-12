import { Box, Typography, Container, Button, Stack, Avatar, IconButton, Divider } from "@mui/material";
import { useParams, useOutletContext, useNavigate } from "react-router";
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
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

const VideoItem = ({ customContext }) => {
  const { playlistId, videoId } = useParams();
  const navigate = useNavigate();
  const { getVideoDetails } = useValidPlaylist();
  const outletContext = useOutletContext();
  
  const context = customContext || outletContext || {};
  const { 
    toggleSidebar, 
    togglePlaylistItems, 
    channelTitle, 
    videoIndex, 
    getVideoIndex, 
    playlistItems,
    playlistId: currentPlaylistId
  } = context;
  
  const playerRef = useRef(null);

  const { title, videoDescription } =
    getVideoDetails(playlistId, videoId) || {};

  const [expanded, setExpanded] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const isZenMode = !togglePlaylistItems;

  const handleNext = () => {
    if (videoIndex < playlistItems.length - 1) {
      const nextVideo = playlistItems[videoIndex + 1];
      getVideoIndex(videoIndex + 1);
      navigate(`/player/${currentPlaylistId}/${nextVideo.videoId}`);
    }
  };

  const handlePrevious = () => {
    if (videoIndex > 0) {
      const prevVideo = playlistItems[videoIndex - 1];
      getVideoIndex(videoIndex - 1);
      navigate(`/player/${currentPlaylistId}/${prevVideo.videoId}`);
    }
  };

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
        case "n":
          if (e.shiftKey) handleNext();
          break;
        case "p":
          if (e.shiftKey) handlePrevious();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [videoIndex]);

  const changeSpeed = (speed) => {
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(speed);
      setPlaybackSpeed(speed);
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
      position: 'relative'
    }}>
      {/* Immersive Video Container */}
      <Box
        sx={{
          position: "relative",
          width: '100%',
          bgcolor: "#000",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          aspectRatio: '16/9',
          maxHeight: 'calc(100vh - 120px)',
          overflow: 'hidden',
          "& .youtube-container": {
            width: "100%",
            height: "100%",
          },
        }}
      >
        <YouTube
          videoId={videoId}
          containerClassName="youtube-container"
          style={{ width: '100%', height: '100%' }}
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
            if (event.data === 0) { // Video ended
              handleNext();
            }
          }}
        />
      </Box>

      {/* Control & Info Area - ALWAYS SHOWN BELOW VIDEO */}
      <Container maxWidth="lg" sx={{ mt: 3, pb: 6 }}>
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{ mb: 2, color: 'text.primary' }}
        >
          {title || "Video Title"}
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
            <Avatar sx={{ bgcolor: 'error.main', width: 40, height: 40 }}>{channelTitle?.charAt(0)}</Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight={800} noWrap>
                {channelTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                1.2M subscribers
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={1}>
              <IconButton 
                onClick={handlePrevious} 
                disabled={videoIndex === 0}
                sx={{ bgcolor: 'action.hover' }}
              >
                <SkipPreviousIcon />
              </IconButton>
              <IconButton 
                onClick={handleNext} 
                disabled={videoIndex === playlistItems.length - 1}
                sx={{ bgcolor: 'action.hover' }}
              >
                <SkipNextIcon />
              </IconButton>
            </Stack>

            <Button variant="contained" sx={{ borderRadius: 50, px: 3, bgcolor: 'text.primary', color: 'background.paper', '&:hover': { bgcolor: 'text.secondary' }, display: { xs: 'none', sm: 'flex' } }}>
              Subscribe
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ width: { xs: '100%', md: 'auto' }, justifyContent: 'flex-end' }}>
            <Box sx={{ display: 'flex', bgcolor: 'action.hover', borderRadius: 50 }}>
              <Button startIcon={<ThumbUpOutlinedIcon />} sx={{ px: 2, color: 'text.primary', textTransform: 'none' }}>12K</Button>
              <Divider orientation="vertical" flexItem />
              <Button sx={{ px: 2, color: 'text.primary' }}><ThumbDownOutlinedIcon /></Button>
            </Box>

            <IconButton onClick={toggleSidebar} sx={{ bgcolor: togglePlaylistItems ? 'primary.main' : 'action.hover', color: togglePlaylistItems ? '#fff' : 'inherit' }}>
              <ViewSidebarOutlinedIcon />
            </IconButton>
          </Stack>
        </Stack>

        {/* Playback Speed Quick Actions */}
        <Stack direction="row" spacing={1} sx={{ mb: 3, overflowX: 'auto', pb: 1 }}>
          <Typography variant="caption" sx={{ alignSelf: 'center', mr: 1, color: 'text.secondary', fontWeight: 700 }}>SPEED</Typography>
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
                fontWeight: 600
              }}
            >
              {speed}x
            </Button>
          ))}
        </Stack>

        <Box sx={{ 
          bgcolor: 'action.hover', 
          p: 3, 
          borderRadius: 4,
        }}>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, color: 'text.primary' }}>
            {expanded ? videoDescription : videoDescription?.slice(0, 300) + "..."}
          </Typography>
          <Button size="small" onClick={() => setExpanded(!expanded)} sx={{ mt: 1, fontWeight: 700 }}>
            {expanded ? "Show less" : "Show more"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default VideoItem;
