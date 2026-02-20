import { Container } from "@mui/material";
import { useParams } from "react-router";

const VideoItem = () => {
  const { videoId } = useParams();
  console.log(videoId);
  return (
    <Container maxWidth="lg" sx={{ mt: 16 }}>
      <h1>Hello world:{videoId}</h1>
    </Container>
  );
};

export default VideoItem;
