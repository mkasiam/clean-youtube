export const extractingPlaylistId = (youtubeLink) => {
  const searchWord = /list=(.*)/;
  const match = youtubeLink.match(searchWord);

  if (match && match[1]) {
    const result = match[1].split("&")[0];
    return result;
  } else {
    return null;
  }
};
