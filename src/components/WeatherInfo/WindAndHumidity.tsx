import { useAppSelector } from "@/hooks/reduxHooks";
import { currentWeatherInterface } from "@/hooks/useWeather/weatherHookHelpers";
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Paragraph } from "react-native-paper";

interface WindAndHumidityProps {
  currentWeatherCurrent: currentWeatherInterface["current"];
}

const WindAndHumidity: React.FC<WindAndHumidityProps> = ({
  currentWeatherCurrent,
}) => {
  const isDarkMode = useAppSelector(
    (state) => state.DarkThemeReducer.isDarkTheme
  );

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
        <Paragraph>
          Wind: {currentWeatherCurrent.gust_kph} kph{" "}
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
