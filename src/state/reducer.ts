import { combineReducers } from "@reduxjs/toolkit";

import DarkThemeReducer from "./slices/DarkTheme";
import LocationReducer from "./slices/Location";

const rootReducer = combineReducers({
  DarkThemeReducer,
  LocationReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
