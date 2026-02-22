import { action, persist } from "easy-peasy";

const favoriteModel = persist(
  {
    items: [],
    addToFavorite: action((state, payload) => {
      if (state.items.includes(payload)) {
        return;
      }
      state.items.push(payload);
    }),
    removeFromFavorite: action((state, payload) => {
      state.items = state.items.filter((item) => item !== payload);
    }),
  },
  {
    storage: "localStorage",
  },
);

export default favoriteModel;
