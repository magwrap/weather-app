import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

let initialState: InitialLocationState = {
  location: "",
};

const STORAGE_KEY = "@location";

const storeLocation = async (location: string) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, location.toString());
  } catch (e) {}
};

export const getLocation = async (): Promise<string> => {
  try {
    const location = await AsyncStorage.getItem(STORAGE_KEY);
    if (location !== null) {
      return location;
    }
  } catch (e) {
    return "";
  }
  return "";
};

const LocationSlice = createSlice({
  name: "Location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      storeLocation(action.payload);
      return {
        location: action.payload,
      };
    },
  },
});

export const { setLocation } = LocationSlice.actions;
export default LocationSlice.reducer;
