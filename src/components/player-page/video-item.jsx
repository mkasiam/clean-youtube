import { Box } from "@mui/material";
import { useParams } from "react-router";
import YouTube from "react-youtube";

const VideoItem = () => {
  const { videoId } = useParams();

  return (
    <Box sx={{ padding: 2 }}>
      <h1>Video is coming soon...</h1>
      <Box
        sx={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
          overflow: "hidden",
          maxWidth: "100%",
          "& iframe": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
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
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default VideoItem;
