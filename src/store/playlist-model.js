import { action, thunk, persist } from "easy-peasy";
import getPlaylist from "../api";

const playlistModel = persist({
  data: {},
  error: "",
  isLoading: false,
  addPlaylist: action((state, payload) => {
    state.data[payload.playlistId] = payload;
  }),
  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  getPlaylistData: thunk(async (actions, payload, helpers) => {
    if (helpers.getState().data[payload]) {
      return;
    }

    actions.setLoading(true);
    try {
      const playlist = await getPlaylist(payload);
      actions.addPlaylist(playlist);
    } catch (e) {
      actions.setError(
        e?.response?.data?.error?.message || "Something Went Wrong!",
      );
    } finally {
      actions.setLoading(false);
    }
  }),
});

export default playlistModel;
