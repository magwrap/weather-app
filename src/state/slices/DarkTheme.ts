import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LayoutAnimation } from "react-native";

let initialState: InitialDarkThemeState = {
  isDarkTheme: false,
};

const DarkThemeSlice = createSlice({
  name: "Dark Theme",
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<void>) => {
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.linear); //TODO: z tym moze byc problem
      return {
        isDarkTheme: !state.isDarkTheme,
      };
    },
  },
});

export const { toggleTheme } = DarkThemeSlice.actions;
export default DarkThemeSlice.reducer;
