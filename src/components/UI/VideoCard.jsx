import { Card, CardMedia, CardContent, CardActions, Typography, Box, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useStoreActions } from "easy-peasy";

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

const formatTimeAgo = (timestamp) => {
  if (!timestamp) return "";
  const diff = Date.now() - timestamp;
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return "Just now";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const VideoCard = ({ video }) => {
  const {
    videoId,
    playlistId,
    title,
    channelTitle,
    thumbnail,
    currentTime,
    duration,
    percentage,
    lastWatched,
    completed
  } = video;

  const clearProgress = useStoreActions((actions) => actions.progress.clearProgress);

  const handleClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearProgress(videoId);
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: "flex",
        flexDirection: "column",
        bgcolor: 'transparent',
        position: 'relative',
        '&:hover': {
          '& .delete-btn': {
            opacity: 1,
          },
          '& .play-overlay': {
            opacity: 1,
          }
        }
      }}
    >
      <Link
        to={`/player/${playlistId}/${videoId}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {/* Thumbnail area with overlays */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 3,
            aspectRatio: '16/9',
            bgcolor: 'black',
          }}
        >
          {thumbnail?.url ? (
            <CardMedia
              component="img"
              image={thumbnail.url}
              alt={title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: "cover",
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.03)' }
              }}
            />
          ) : (
            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.900' }}>
              <Typography variant="caption" color="text.secondary">No Thumbnail</Typography>
            </Box>
          )}

          {/* Hover Play Overlay */}
          <Box
            className="play-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.2s',
              zIndex: 1,
            }}
          >
            <PlayArrowIcon sx={{ color: '#fff', fontSize: 48 }} />
          </Box>

          {/* Duration Badge */}
          {duration > 0 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                bgcolor: 'rgba(0,0,0,0.8)',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 700,
                px: 0.8,
                py: 0.2,
                borderRadius: 1,
                zIndex: 2,
              }}
            >
              {formatDuration(duration)}
            </Box>
          )}

          {/* Completed Badge */}
          {completed && (
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                bgcolor: 'success.main',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: 900,
                px: 0.8,
                py: 0.2,
                borderRadius: 1,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                zIndex: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Completed
            </Box>
          )}

          {/* Progress Bar */}
          {percentage > 0 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: 4,
                bgcolor: 'rgba(255, 255, 255, 0.3)',
                overflow: 'hidden',
                zIndex: 2
              }}
            >
              <Box
                sx={{
                  width: `${percentage}%`,
                  height: '100%',
                  bgcolor: 'primary.main',
                }}
              />
            </Box>
          )}

          {/* Inline Delete Button */}
          <Tooltip title="Remove watch progress">
            <IconButton
              className="delete-btn"
              size="small"
              onClick={handleClear}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'rgba(0,0,0,0.7)',
                color: '#fff',
                opacity: 0,
                transition: 'opacity 0.2s',
                zIndex: 3,
                '&:hover': {
                  bgcolor: 'error.main',
                }
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Text content details */}
        <CardContent sx={{ flexGrow: 1, px: 0, pt: 1.5, pb: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              lineHeight: 1.3,
              mb: 0.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              color: 'text.primary',
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {channelTitle}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.3 }}>
            {percentage}% watched • {formatTimeAgo(lastWatched)}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default VideoCard;
