import { action, persist } from "easy-peasy";

const progressModel = persist(
  {
    items: {}, // Maps videoId -> { videoId, playlistId, title, channelTitle, thumbnail, currentTime, duration, percentage, lastWatched, completed }
    lastWatchedVideoId: null,

    updateProgress: action((state, payload) => {
      const { videoId, playlistId, title, channelTitle, thumbnail, currentTime, duration } = payload;
      
      const percentage = duration > 0 ? Math.round((currentTime / duration) * 100) : 0;
      const completed = percentage >= 90;

      state.items[videoId] = {
        videoId,
        playlistId,
        title,
        channelTitle,
        thumbnail,
        currentTime,
        duration,
        percentage,
        lastWatched: Date.now(),
        // Once a video is marked completed, keep it completed unless we seek back to start?
        // Let's say if percentage >= 90, it is completed.
        completed: completed || (state.items[videoId]?.completed ?? false),
      };

      state.lastWatchedVideoId = videoId;
    }),

    clearProgress: action((state, payload) => {
      if (payload) {
        delete state.items[payload];
        if (state.lastWatchedVideoId === payload) {
          state.lastWatchedVideoId = null;
        }
      } else {
        state.items = {};
        state.lastWatchedVideoId = null;
      }
    }),
  },
  {
    storage: "localStorage",
  }
);

export default progressModel;
