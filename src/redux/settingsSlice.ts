import { createSlice } from "@reduxjs/toolkit";

type Language = "English" | "Bosanski" | "Hrvatski" | "Srpski";

interface UserState {
  theme: string;
  language: Language;
}

const initialState: UserState = {
  theme: "light", // default theme
  language: "English", // default language
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleThemeReducer(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const { toggleThemeReducer, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
