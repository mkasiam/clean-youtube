import { Box, Typography, Container, Button, Stack, Avatar, IconButton, Divider, Dialog, DialogActions, DialogContent, DialogTitle, Tabs, Tab, TextField, Paper, Tooltip } from "@mui/material";
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
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import SpeedIcon from "@mui/icons-material/Speed";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddCommentIcon from "@mui/icons-material/AddComment";

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
  const [hud, setHud] = useState({ visible: false, icon: null, text: "" });
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const hudTimeoutRef = useRef(null);

  const [activeTab, setActiveTab] = useState("description");
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [currentTime, setCurrentTime] = useState(0);

  // Parse chapters from description
  const parseChapters = (description) => {
    if (!description) return [];
    const chaptersList = [];
    const lines = description.split('\n');
    const timestampRegex = /(?:\[)?(?:(\d{1,2}):)?(\d{1,2}):(\d{2})(?:\])?/;
    
    lines.forEach((line) => {
      const match = line.match(timestampRegex);
      if (match) {
        const timestampStr = match[0];
        const hours = match[1] ? parseInt(match[1], 10) : 0;
        const minutes = parseInt(match[2], 10);
        const seconds = parseInt(match[3], 10);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        
        let label = line.replace(timestampStr, '').trim();
        label = label.replace(/^[:\-\s\u2013\u2014]+/, '').replace(/[:\-\s]+$/, '').trim();
        
        if (label.length === 0) {
          label = `Chapter at ${timestampStr}`;
        }
        
        chaptersList.push({
          time: totalSeconds,
          timeStr: timestampStr,
          label
        });
      }
    });
    return chaptersList.sort((a, b) => a.time - b.time);
  };

  const chapters = parseChapters(videoDescription);

  // Reset tab to description if chapters tab is selected but current video has no chapters
  useEffect(() => {
    if (activeTab === "chapters" && chapters.length === 0) {
      setActiveTab("description");
    }
  }, [videoId, chapters.length]);

  // Poll current time when video is playing
  useEffect(() => {
    let interval;
    if (playerRef.current) {
      interval = setInterval(() => {
        try {
          if (playerRef.current.getPlayerState() === 1) { // 1 is playing
            setCurrentTime(playerRef.current.getCurrentTime());
          }
        } catch (e) {
          // Player not fully initialized yet
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [videoId]);

  // Determine current active chapter index
  const getActiveChapterIndex = () => {
    let activeIndex = -1;
    for (let i = 0; i < chapters.length; i++) {
      if (currentTime >= chapters[i].time) {
        activeIndex = i;
      } else {
        break;
      }
    }
    return activeIndex;
  };
  const activeChapterIndex = getActiveChapterIndex();

  useEffect(() => {
    const savedNotes = localStorage.getItem(`clean-youtube-notes-${playlistId}-${videoId}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      setNotes([]);
    }
  }, [playlistId, videoId]);

  const triggerHud = (icon, text) => {
    if (hudTimeoutRef.current) {
      clearTimeout(hudTimeoutRef.current);
    }
    setHud({ visible: true, icon, text });
    hudTimeoutRef.current = setTimeout(() => {
      setHud((prev) => ({ ...prev, visible: false }));
    }, 1000);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [
      h > 0 ? h : null,
      h > 0 ? String(m).padStart(2, '0') : m,
      String(s).padStart(2, '0')
    ].filter(Boolean).join(':');
  };

  const handleSaveNote = () => {
    if (!noteText.trim() || !playerRef.current) return;
    try {
      const currentTime = playerRef.current.getCurrentTime();
      const newNote = {
        id: Date.now().toString(),
        time: currentTime,
        text: noteText.trim()
      };
      const updatedNotes = [...notes, newNote].sort((a, b) => a.time - b.time);
      setNotes(updatedNotes);
      localStorage.setItem(`clean-youtube-notes-${playlistId}-${videoId}`, JSON.stringify(updatedNotes));
      setNoteText("");
      triggerHud(<BookmarkIcon sx={{ fontSize: 36 }} />, `Note saved!`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter((n) => n.id !== noteId);
    setNotes(updatedNotes);
    localStorage.setItem(`clean-youtube-notes-${playlistId}-${videoId}`, JSON.stringify(updatedNotes));
  };

  const handleJumpToNote = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
      triggerHud(<PlayArrowIcon sx={{ fontSize: 36 }} />, `Seek: ${formatTime(time)}`);
    }
  };

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
      // Ignore if user is typing in an input, textarea, or contentEditable element
      if (
        e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA' || 
        e.target.isContentEditable
      ) return;
      
      if (!playerRef.current) return;
      const player = playerRef.current;

      const key = e.key.toLowerCase();

      // Playback speed shortcuts: Shift + > / Shift + <
      if (e.key === ">" || (e.shiftKey && (e.key === "." || e.key === ">"))) {
        e.preventDefault();
        const rates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
        try {
          const currentRate = player.getPlaybackRate();
          const currentIndex = rates.indexOf(currentRate);
          if (currentIndex !== -1 && currentIndex < rates.length - 1) {
            const nextRate = rates[currentIndex + 1];
            player.setPlaybackRate(nextRate);
            setPlaybackSpeed(nextRate);
            triggerHud(<SpeedIcon sx={{ fontSize: 36 }} />, `${nextRate}x`);
          }
        } catch (err) {
          console.error(err);
        }
        return;
      }

      if (e.key === "<" || (e.shiftKey && (e.key === "," || e.key === "<"))) {
        e.preventDefault();
        const rates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
        try {
          const currentRate = player.getPlaybackRate();
          const currentIndex = rates.indexOf(currentRate);
          if (currentIndex !== -1 && currentIndex > 0) {
            const prevRate = rates[currentIndex - 1];
            player.setPlaybackRate(prevRate);
            setPlaybackSpeed(prevRate);
            triggerHud(<SpeedIcon sx={{ fontSize: 36 }} />, `${prevRate}x`);
          }
        } catch (err) {
          console.error(err);
        }
        return;
      }

      // Numeric seeking shortcuts (0-9)
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        try {
          const duration = player.getDuration();
          if (duration) {
            const percent = parseInt(e.key, 10);
            const targetTime = duration * (percent / 10);
            player.seekTo(targetTime);
            triggerHud(<FastForwardIcon sx={{ fontSize: 36 }} />, `${percent * 10}%`);
          }
        } catch (err) {
          console.error(err);
        }
        return;
      }

      // Question mark shortcut for Help cheat-sheet
      if (e.key === "?") {
        e.preventDefault();
        setShortcutsOpen(true);
        return;
      }

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          try {
            const state = player.getPlayerState();
            if (state === 1) {
              player.pauseVideo();
              triggerHud(<PauseIcon sx={{ fontSize: 40 }} />, "Pause");
            } else {
              player.playVideo();
              triggerHud(<PlayArrowIcon sx={{ fontSize: 40 }} />, "Play");
            }
          } catch (err) {
            console.error(err);
          }
          break;
        case "j":
          try {
            const newTime = player.getCurrentTime() - 10;
            player.seekTo(newTime);
            triggerHud(<FastRewindIcon sx={{ fontSize: 36 }} />, "-10s");
          } catch (err) {
            console.error(err);
          }
          break;
        case "l":
          try {
            const newTime = player.getCurrentTime() + 10;
            player.seekTo(newTime);
            triggerHud(<FastForwardIcon sx={{ fontSize: 36 }} />, "+10s");
          } catch (err) {
            console.error(err);
          }
          break;
        case "arrowleft":
          e.preventDefault();
          try {
            const newTime = player.getCurrentTime() - 5;
            player.seekTo(newTime);
            triggerHud(<FastRewindIcon sx={{ fontSize: 36 }} />, "-5s");
          } catch (err) {
            console.error(err);
          }
          break;
        case "arrowright":
          e.preventDefault();
          try {
            const newTime = player.getCurrentTime() + 5;
            player.seekTo(newTime);
            triggerHud(<FastForwardIcon sx={{ fontSize: 36 }} />, "+5s");
          } catch (err) {
            console.error(err);
          }
          break;
        case "arrowup":
          e.preventDefault();
          try {
            if (player.isMuted()) player.unMute();
            const vol = player.getVolume();
            const newVol = Math.min(vol + 5, 100);
            player.setVolume(newVol);
            triggerHud(<VolumeUpIcon sx={{ fontSize: 36 }} />, `${newVol}%`);
          } catch (err) {
            console.error(err);
          }
          break;
        case "arrowdown":
          e.preventDefault();
          try {
            if (player.isMuted()) player.unMute();
            const vol = player.getVolume();
            const newVol = Math.max(vol - 5, 0);
            player.setVolume(newVol);
            triggerHud(<VolumeDownIcon sx={{ fontSize: 36 }} />, `${newVol}%`);
          } catch (err) {
            console.error(err);
          }
          break;
        case "m":
          try {
            if (player.isMuted()) {
              player.unMute();
              triggerHud(<VolumeUpIcon sx={{ fontSize: 36 }} />, "Unmuted");
            } else {
              player.mute();
              triggerHud(<VolumeOffIcon sx={{ fontSize: 36 }} />, "Muted");
            }
          } catch (err) {
            console.error(err);
          }
          break;
        case "t":
          e.preventDefault();
          if (typeof toggleSidebar === "function") {
            toggleSidebar();
            triggerHud(
              <AspectRatioIcon sx={{ fontSize: 36 }} />, 
              !togglePlaylistItems ? "Default Mode" : "Theater Mode"
            );
          }
          break;
        case "n":
          if (e.shiftKey) {
            handleNext();
            triggerHud(<SkipNextIcon sx={{ fontSize: 36 }} />, "Next");
          }
          break;
        case "p":
          if (e.shiftKey) {
            handlePrevious();
            triggerHud(<SkipPreviousIcon sx={{ fontSize: 36 }} />, "Previous");
          }
          break;
        case "f":
          e.preventDefault();
          try {
            const iframe = player.getIframe();
            if (iframe) {
              if (document.fullscreenElement) {
                document.exitFullscreen();
                triggerHud(<FullscreenIcon sx={{ fontSize: 36 }} />, "Exit Fullscreen");
              } else {
                iframe.requestFullscreen();
                triggerHud(<FullscreenIcon sx={{ fontSize: 36 }} />, "Fullscreen");
              }
            }
          } catch (err) {
            console.error(err);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [videoIndex, playlistItems, togglePlaylistItems]);

  const changeSpeed = (speed) => {
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(speed);
      setPlaybackSpeed(speed);
      triggerHud(<SpeedIcon sx={{ fontSize: 36 }} />, `${speed}x`);
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
      minHeight: '100%',
      overflow: 'visible'
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

        {/* Visual HUD HUD Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            bgcolor: "rgba(0, 0, 0, 0.75)",
            color: "white",
            borderRadius: "50%",
            width: 88,
            height: 88,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: hud.visible ? 1 : 0,
            transform: hud.visible ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.8)",
            transition: "all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            pointerEvents: "none",
            zIndex: 10,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
          }}
        >
          {hud.icon}
          {hud.text && (
            <Typography 
              variant="caption" 
              sx={{ 
                mt: 0.5, 
                fontWeight: 800, 
                fontSize: "0.75rem",
                letterSpacing: 0.5
              }}
            >
              {hud.text}
            </Typography>
          )}
        </Box>
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
          spacing={3}
          sx={{ mb: 4, width: '100%' }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', flexWrap: 'wrap', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'error.main', width: 44, height: 44, fontSize: '1.2rem', fontWeight: 700 }}>
              {channelTitle?.charAt(0)}
            </Avatar>
            <Box sx={{ flexGrow: 1, minWidth: '150px' }}>
              <Typography variant="subtitle1" fontWeight={900} noWrap sx={{ fontSize: '1.1rem' }}>
                {channelTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                1.2M subscribers
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton 
                onClick={handlePrevious} 
                disabled={videoIndex === 0}
                sx={{ bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider' }}
              >
                <SkipPreviousIcon />
              </IconButton>
              <IconButton 
                onClick={handleNext} 
                disabled={videoIndex === playlistItems.length - 1}
                sx={{ bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider' }}
              >
                <SkipNextIcon />
              </IconButton>
              
              <Button 
                variant="contained" 
                sx={{ 
                  borderRadius: 50, 
                  px: 4, 
                  py: 1,
                  bgcolor: 'text.primary', 
                  color: 'background.paper', 
                  fontWeight: 800,
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'text.secondary' } 
                }}
              >
                Subscribe
              </Button>

              <Button
                variant="outlined"
                startIcon={<AspectRatioIcon />}
                onClick={toggleSidebar}
                sx={{
                  borderRadius: 50,
                  px: 2,
                  py: 0.8,
                  textTransform: 'none',
                  fontWeight: 800,
                  borderColor: 'divider',
                  display: { xs: 'none', sm: 'flex' },
                  bgcolor: !togglePlaylistItems ? 'primary.main' : 'transparent',
                  color: !togglePlaylistItems ? '#fff' : 'text.primary',
                  '&:hover': {
                    bgcolor: !togglePlaylistItems ? 'primary.dark' : 'action.hover',
                    borderColor: 'primary.main'
                  }
                }}
              >
                {!togglePlaylistItems ? "Exit Theater" : "Theater Mode"}
              </Button>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1.5} sx={{ width: { xs: '100%', md: 'auto' }, justifyContent: 'flex-end', flexShrink: 0 }}>
            <Box sx={{ display: 'flex', bgcolor: 'action.hover', borderRadius: 50, border: '1px solid', borderColor: 'divider' }}>
              <Button startIcon={<ThumbUpOutlinedIcon />} sx={{ px: 2, color: 'text.primary', textTransform: 'none', fontWeight: 700 }}>12K</Button>
              <Divider orientation="vertical" flexItem sx={{ my: 1 }} />
              <Button sx={{ px: 2, color: 'text.primary' }}><ThumbDownOutlinedIcon /></Button>
            </Box>

            <Button 
              startIcon={<ShareOutlinedIcon />}
              sx={{ 
                bgcolor: 'action.hover', 
                borderRadius: 50, 
                px: 2, 
                color: 'text.primary', 
                textTransform: 'none', 
                fontWeight: 700,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              Share
            </Button>

            <IconButton 
              onClick={toggleSidebar} 
              sx={{ 
                display: { xs: 'flex', sm: 'none' },
                bgcolor: !togglePlaylistItems ? 'primary.main' : 'action.hover',
                color: !togglePlaylistItems ? '#fff' : 'inherit',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <AspectRatioIcon />
            </IconButton>
          </Stack>
        </Stack>

        {/* Playback Speed Quick Actions & Keyboard Shortcuts button */}
        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ 
            mb: 3, 
            overflowX: 'auto', 
            pb: 1,
            alignItems: 'center',
            width: '100%'
          }}
        >
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

          <Box sx={{ flexGrow: 1 }} />
          
          <Button
            size="small"
            startIcon={<KeyboardIcon />}
            onClick={() => setShortcutsOpen(true)}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.8rem',
              color: 'text.secondary',
              '&:hover': { 
                color: 'primary.main',
                bgcolor: 'action.hover'
              },
              px: 2,
              flexShrink: 0
            }}
          >
            Keyboard Shortcuts
          </Button>
        </Stack>

        {/* Keyboard Shortcuts Dialog */}
        <Dialog
          open={shortcutsOpen}
          onClose={() => setShortcutsOpen(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              p: 2,
              bgcolor: 'background.paper',
              backgroundImage: 'none',
              boxShadow: 24
            }
          }}
        >
          <DialogTitle sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
            <KeyboardIcon color="primary" /> Keyboard Shortcuts
          </DialogTitle>
          <DialogContent sx={{ p: 0, px: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
              {[
                { keys: ["Space", "K"], desc: "Play / Pause" },
                { keys: ["J", "←"], desc: "Seek Backward (10s / 5s)" },
                { keys: ["L", "→"], desc: "Seek Forward (10s / 5s)" },
                { keys: ["↑", "↓"], desc: "Volume Up / Down by 5%" },
                { keys: ["M"], desc: "Mute / Unmute" },
                { keys: ["0 - 9"], desc: "Seek to 0% - 90% of video" },
                { keys: ["Shift + >", "Shift + <"], desc: "Increase / Decrease Speed" },
                { keys: ["T"], desc: "Toggle Theater Mode" },
                { keys: ["F"], desc: "Toggle Fullscreen" },
                { keys: ["Shift + N", "Shift + P"], desc: "Next / Previous Video" },
                { keys: ["?"], desc: "Open Shortcuts Menu" },
              ].map((shortcut, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    py: 1,
                    borderBottom: index !== 10 ? '1px solid' : 'none',
                    borderColor: 'divider'
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    {shortcut.desc}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {shortcut.keys.map((k, i) => (
                      <Box 
                        key={i} 
                        sx={{ 
                          px: 1, 
                          py: 0.5, 
                          bgcolor: 'action.hover', 
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1.5,
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          fontFamily: 'monospace',
                          color: 'text.primary'
                        }}
                      >
                        {k}
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 2, pt: 1 }}>
            <Button 
              onClick={() => setShortcutsOpen(false)} 
              variant="contained" 
              sx={{ 
                borderRadius: 50,
                textTransform: 'none',
                fontWeight: 700,
                px: 3
              }}
            >
              Dismiss
            </Button>
          </DialogActions>
        </Dialog>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, val) => setActiveTab(val)}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '1rem',
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main',
                }
              }
            }}
          >
            <Tab value="description" label="Description" />
            {chapters.length > 0 && <Tab value="chapters" label={`Chapters (${chapters.length})`} />}
            <Tab value="notes" label={`Notes & Bookmarks (${notes.length})`} />
          </Tabs>
        </Box>

        {activeTab === "description" && (
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
        )}

        {activeTab === "chapters" && chapters.length > 0 && (
          <Box sx={{ 
            bgcolor: 'action.hover', 
            p: 3, 
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            <Typography variant="subtitle1" fontWeight={800} color="text.primary">
              Interactive Chapters
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', pl: 2, maxHeight: '400px', overflowY: 'auto' }}>
              {/* Vertical connecting line */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  left: 7, 
                  top: 20, 
                  bottom: 20, 
                  width: '2px', 
                  bgcolor: 'divider',
                  zIndex: 0
                }} 
              />
              
              {chapters.map((chapter, index) => {
                const isActive = index === activeChapterIndex;
                return (
                  <Box 
                    key={index}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2.5, 
                      py: 1.5,
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    {/* Bullet milestone dot */}
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        bgcolor: isActive ? 'primary.main' : 'divider',
                        border: '2px solid',
                        borderColor: 'background.paper',
                        marginLeft: '-11px',
                        transition: 'all 0.3s',
                        transform: isActive ? 'scale(1.2)' : 'none',
                        boxShadow: isActive ? '0 0 8px rgba(229, 9, 20, 0.5)' : 'none'
                      }} 
                    />
                    
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        borderRadius: 3,
                        bgcolor: isActive ? 'action.selected' : 'background.paper',
                        border: '1px solid',
                        borderColor: isActive ? 'primary.main' : 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        flexGrow: 1,
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: 'primary.main',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }
                      }}
                      onClick={() => handleJumpToNote(chapter.time)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            borderRadius: 2,
                            px: 1.5,
                            py: 0.5,
                            textTransform: 'none',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            borderColor: isActive ? 'primary.main' : 'divider',
                            color: isActive ? '#fff' : 'text.primary',
                            bgcolor: isActive ? 'primary.main' : 'transparent',
                            flexShrink: 0,
                            minWidth: '60px',
                            '&:hover': {
                              bgcolor: 'primary.main',
                              color: '#fff',
                              borderColor: 'primary.main'
                            }
                          }}
                        >
                          {chapter.timeStr}
                        </Button>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: isActive ? 800 : 600, 
                            color: isActive ? 'primary.main' : 'text.primary',
                            wordBreak: 'break-word'
                          }}
                        >
                          {chapter.label}
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}

        {activeTab === "notes" && (
          <Box sx={{ 
            bgcolor: 'action.hover', 
            p: 3, 
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            <Typography variant="subtitle1" fontWeight={800} color="text.primary">
              Personal Study Notes & Bookmarks
            </Typography>
            
            {/* Input section */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              <TextField
                placeholder="Add a timestamped note (e.g. 'Important setup detail')"
                variant="outlined"
                fullWidth
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                size="small"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSaveNote();
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: 'background.paper'
                  }
                }}
              />
              <Button 
                variant="contained" 
                startIcon={<AddCommentIcon />}
                onClick={handleSaveNote}
                sx={{
                  borderRadius: 50,
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 800,
                  whiteSpace: 'nowrap'
                }}
              >
                Add Bookmark
              </Button>
            </Stack>

            <Divider sx={{ my: 1 }} />

            {/* Notes List */}
            {notes.length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4, fontWeight: 600 }}>
                No notes taken yet. Take notes at any point to bookmark key moments in the video!
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxHeight: '400px', overflowY: 'auto', pr: 1 }}>
                {notes.map((note) => (
                  <Paper
                    key={note.id}
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: 3,
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, minWidth: 0 }}>
                      <Tooltip title="Jump to moment">
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<BookmarkIcon sx={{ fontSize: '0.9rem !important' }} />}
                          onClick={() => handleJumpToNote(note.time)}
                          sx={{
                            borderRadius: 2,
                            px: 1.5,
                            py: 0.5,
                            textTransform: 'none',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            flexShrink: 0,
                            '&:hover': {
                              bgcolor: 'primary.main',
                              color: '#fff',
                              borderColor: 'primary.main'
                            }
                          }}
                        >
                          {formatTime(note.time)}
                        </Button>
                      </Tooltip>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 600, 
                          color: 'text.primary',
                          wordBreak: 'break-word'
                        }}
                      >
                        {note.text}
                      </Typography>
                    </Box>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDeleteNote(note.id)}
                      sx={{ 
                        color: 'text.secondary',
                        flexShrink: 0,
                        '&:hover': { color: 'error.main' } 
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default VideoItem;
