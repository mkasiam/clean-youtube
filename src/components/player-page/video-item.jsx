import { Box, Typography, Container, Button } from "@mui/material";
import { useParams } from "react-router";
import { useState } from "react";
import YouTube from "react-youtube";
import useValidPlaylist from "../../hooks/useValidPlaylist.jsx";

const VideoItem = () => {
  const { playlistId, videoId } = useParams();
  const { getVideoDetails } = useValidPlaylist();

  const { title, videoDescription } =
    getVideoDetails(playlistId, videoId) || {};

  const [expanded, setExpanded] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ padding: 2 }}>
      <Box
        sx={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
          overflow: "hidden",
          maxWidth: "100%",
          marginBottom: 3,
          backgroundColor: "#000",
          borderRadius: 1,
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
            },
          }}
        />
      </Box>

      {/* Title */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          marginBottom: 2,
          fontWeight: 700,
          fontSize: { xs: "24px", md: "28px" },
        }}
      >
        {title || "Video Title"}
      </Typography>

      {/* Description */}
      <Box>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            display: expanded ? "block" : "-webkit-box",
            WebkitLineClamp: expanded ? "unset" : 2,
            WebkitBoxOrient: "vertical",
            overflow: expanded ? "visible" : "hidden",
            fontSize: "14px",
          }}
        >
          {videoDescription || "No description available"}
        </Typography>
        {videoDescription && (
          <Button
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{ marginTop: 1, textTransform: "none" }}
          >
            {expanded ? "See less" : "See more"}
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default VideoItem;
