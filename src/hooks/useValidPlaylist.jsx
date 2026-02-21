import { useStoreState } from "easy-peasy";

const useValidPlaylist = () => {
  const playlists = useStoreState((state) => state.playlists.data);

  const getPlaylistDetails = (playlistId) => {
    return playlists[playlistId];
  };

  const getVideoDetails = (playlistId, videoId) => {
    return (
      playlists[playlistId]?.playlistItems?.find(
        (item) => item.videoId === videoId,
      ) ?? null
    );
  };

  return {
    getPlaylistDetails,
    getVideoDetails,
  };
};

export default useValidPlaylist;
