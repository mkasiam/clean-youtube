import axios from "axios";

const key = import.meta.env.VITE_YOUTUBE_API_KEY;

const getPlaylistItem = async (playlistId, pageToken = "", result = []) => {
  const URL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=id,contentDetails,snippet&maxResults=50&playlistId=${playlistId}&pageToken=${pageToken}`;

  const { data } = await axios.get(URL);
  result = [...result, ...data.items];

  if (data.nextPageToken) {
    result = await getPlaylistItem(playlistId, data.nextPageToken, result);
  }

  return result;
};

const getPlaylist = async (playlistId) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${key}`;

  const { data } = await axios.get(URL);

  const {
    channelId,
    title: playlistTitle,
    description: playlistDescription,
    thumbnails,
    channelTitle,
  } = data?.items[0]?.snippet ?? {};

  let playlistItems = await getPlaylistItem(playlistId);

  playlistItems = playlistItems.map((item) => {
    const {
      title,
      description: videoDescription,
      thumbnails: { medium },
    } = item.snippet;

    return {
      title,
      videoDescription,
      thumbnail: medium,
    };
  });

  return {
    playlistId,
    playlistTitle,
    playlistDescription,
    channelId,
    playlistThumbnail: thumbnails.default,
    channelTitle,
    playlistItems,
  };
};

export default getPlaylist;
