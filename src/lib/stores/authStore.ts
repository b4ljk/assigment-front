import { create } from "zustand";

// Define a state
type State = {
  isLogged: boolean;
  logOut: () => void;
  changeIsLogged: (isLogged: boolean) => void;
};

const useGlobalStore = create<State>((set, get) => ({
  // Initialize isLogged based on localStorage only if it's available (i.e., in the browser)
  isLogged: typeof window !== "undefined" && localStorage.getItem("access_token") ? true : false,

  logOut: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
    set({ isLogged: false });
  },

  changeIsLogged: (isLogged) => {
    set({ isLogged });
  },
}));

export default useGlobalStore;
