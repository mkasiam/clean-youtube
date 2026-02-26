import { action, persist } from "easy-peasy";

const recentModel = persist(
  {
    items: [],
    addToRecent: action((state, payload) => {
      if (state.items.includes(payload)) {
        return;
      }
      state.items.unshift(payload);
      state.items = state.items.slice(0, 5);
    }),
    removeFromRecent: action((state, payload) => {
      const index = state.items.indexOf(payload);
      state.items.splice(index, 1);
    }),
  },
  {
    storage: "localStorage",
  },
);

export default recentModel;
