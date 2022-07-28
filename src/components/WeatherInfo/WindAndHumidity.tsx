import { useAppSelector } from "@/hooks/reduxHooks";
import { currentWeatherInterface } from "@/hooks/useWeather/weatherHookHelpers";
import React, { useEffect } from "react";
import { StyleSheet, View, Image, Animated } from "react-native";
import { Paragraph } from "react-native-paper";
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface WindAndHumidityProps {
  currentWeatherCurrent: currentWeatherInterface["current"];
}

const WindAndHumidity: React.FC<WindAndHumidityProps> = ({
  currentWeatherCurrent,
}) => {
  const isDarkMode = useAppSelector(
    (state) => state.DarkThemeReducer.isDarkTheme
  );

  const offset = useSharedValue(0);

  const animimatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: 120 }],
    };
  });
  //FIXME: sprawic zeby ta animacja dzialala
  useEffect(() => {
    offset.value = withRepeat(withTiming(1200), -1, true);
  }, []);

  return (
    <>
      <View style={styles.airProps}>
        <Image
          source={require("../../../assets/images/humidity.png")}
          style={[styles.weatherIcon, styles.iconMargin]}
        />
        <Paragraph>Humidity: {currentWeatherCurrent.humidity}%</Paragraph>
      </View>
      <View style={styles.airProps}>
        <Animated.View
          style={[animimatedImageStyle, { backgroundColor: "red" }]}>
          {isDarkMode ? (
            <Image
              source={require("../../../assets/images/wind-inverted.png")}
              style={[styles.weatherIcon, styles.iconMargin]}
            />
          ) : (
            <Image
              source={require("../../../assets/images/wind.png")}
              style={[styles.weatherIcon, styles.iconMargin]}
            />
          )}
        </Animated.View>
        <Paragraph>
          Wind: {currentWeatherCurrent.gust_kph}kph{" "}
          {currentWeatherCurrent.wind_dir}
        </Paragraph>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  iconMargin: { marginRight: "4%" },
  weatherIcon: { height: 30, width: 40 },
  airProps: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default WindAndHumidity;
