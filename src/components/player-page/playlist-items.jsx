import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import { useStoreState } from "easy-peasy";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const PlaylistItems = ({
  item,
  index,
  currentPlaylistId,
  getVideoIndex,
  channelTitle,
  compact = false,
  active = false,
}) => {
  const progressItems = useStoreState((state) => state.progress.items);
  const progress = progressItems[item.videoId];
  
  return (
    <Grid item xs={12}>
      <Link
        onClick={() => {
          getVideoIndex(index);
        }}
        to={`/player/${currentPlaylistId}/${item.videoId}`}
        component={RouterLink}
        sx={{ textDecoration: "none" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1,
            gap: 1.5,
            borderRadius: 2,
            bgcolor: active ? "action.selected" : "transparent",
            "&:hover": { bgcolor: "action.hover" },
            cursor: "pointer",
            transition: 'all 0.2s',
            borderLeft: active ? '4px solid' : '4px solid transparent',
            borderColor: active ? 'info.main' : 'transparent'
          }}
        >
          {/* Index or Play Icon */}
          <Box sx={{ minWidth: 24, display: 'flex', justifyContent: 'center' }}>
            {active ? (
              <PlayArrowIcon sx={{ fontSize: 18, color: 'info.main' }} />
            ) : (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'text.secondary',
                  fontWeight: 700
                }}
              >
                {index + 1}
              </Typography>
            )}
          </Box>

          {/* Thumbnail */}
          <Box sx={{ position: 'relative', flexShrink: 0, overflow: 'hidden', borderRadius: 2 }}>
            <CardMedia
              component="img"
              image={item.thumbnail.url}
              alt={item.title}
              sx={{
                width: 120,
                height: 68,
                objectFit: "cover",
                display: 'block'
              }}
            />
            
            {/* Completed Badge */}
            {progress?.completed && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  bgcolor: 'success.main',
                  color: '#fff',
                  fontSize: '0.6rem',
                  fontWeight: 900,
                  px: 0.5,
                  py: 0.1,
                  borderRadius: 0.5,
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
            {progress && progress.percentage > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: 4,
                  bgcolor: 'rgba(0, 0, 0, 0.4)',
                  overflow: 'hidden',
                  zIndex: 2
                }}
              >
                <Box
                  sx={{
                    width: `${progress.percentage}%`,
                    height: '100%',
                    bgcolor: 'primary.main',
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Details */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: active ? 700 : 500,
                color: active ? 'info.main' : 'text.primary',
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                fontSize: '0.875rem',
                lineHeight: 1.2
              }}
            >
              {item.title}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: "text.secondary",
                display: 'block',
                mt: 0.5
              }}
            >
              {channelTitle}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Grid>
  );
};

export default PlaylistItems;
