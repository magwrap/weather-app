import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import useCachedResources from "./src/hooks/useCachedResources";
import Routes from "@/navigation/Routes";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { getLocation, setLocation, store } from "@/state";

import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { CombinedDarkTheme, CombinedDefaultTheme } from "@/styles/CobinedThems";
import { LayoutAnimation, Platform, UIManager } from "react-native";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  const isLoadingComplete = useCachedResources();
  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
  const Themes = () => {
    const isThemeDark = useAppSelector(
      (state) => state.DarkThemeReducer.isDarkTheme
    );
    let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
    const dispatch = useAppDispatch();
    useEffect(() => {
      (async () => {
        const location = await getLocation();
        dispatch(setLocation(location));
      })();
    }, []);
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Routes />
          <StatusBar />
        </NavigationContainer>
      </PaperProvider>
    );
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <Themes />
      </Provider>
    );
  }
}
