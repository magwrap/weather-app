import { useAppSelector } from "@/hooks/reduxHooks";
import { currentWeatherInterface } from "@/hooks/useWeather/weatherHookHelpers";
import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Paragraph } from "react-native-paper";
import Animated, {
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

  const windOffset = useSharedValue(0);
  const dropsOffset = useSharedValue(0);

  const animimatedWindImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: windOffset.value }],
    };
  });

  const animatedDropsImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: dropsOffset.value }],
    };
  });

  useEffect(() => {
    windOffset.value = withRepeat(
      withTiming(-2, {
        duration: 1000 / (currentWeatherCurrent.wind_mph / 20),
      }),
      -1,
      true
    );
    dropsOffset.value = withRepeat(withTiming(3, { duration: 5000 }), -1, true);
  }, []);

  return (
    <>
      <View style={styles.airProps}>
        <Animated.View style={animatedDropsImageStyle}>
          <Image
            source={require("../../../assets/images/humidity.png")}
            style={[styles.weatherIcon, styles.iconMargin]}
          />
        </Animated.View>
        <Paragraph>Humidity: {currentWeatherCurrent.humidity}%</Paragraph>
      </View>
      <View style={styles.airProps}>
        <Animated.View style={[animimatedWindImageStyle]}>
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
