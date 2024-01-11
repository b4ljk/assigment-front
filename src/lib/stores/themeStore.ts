import { create } from "zustand";
import { createSelectors } from "./helper";

type State = {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  toggleTheme: () => void;
};

const _useThemeStore = create<State>((set, get) => ({
  theme: "system",
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => {
    return set(() => ({
      theme: "dark",
    }));
  },
}));

const useThemeStore = createSelectors(_useThemeStore);

export default useThemeStore;
