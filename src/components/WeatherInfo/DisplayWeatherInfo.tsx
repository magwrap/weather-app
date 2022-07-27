import { weatherForecastInterface } from "@/hooks/useWeather/weatherHookHelpers";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Subheading, Divider, useTheme, Surface } from "react-native-paper";
import AirPollution from "./AirPollution";
import CurrenWeather from "./CurrenWeather";
import WeatherForecast from "./WeatherForecast";
import WindAndHumidity from "./WindAndHumidity";

interface DisplayWeatherInfoProps {
  currentWeather: weatherForecastInterface;
}

const DisplayWeatherInfo: React.FC<DisplayWeatherInfoProps> = ({
  currentWeather,
}) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.surface, { backgroundColor: colors.background }]}>
      <View style={styles.shelf}>
        <CurrenWeather currentWeatherCurrent={currentWeather.current} />
      </View>
      <Divider style={{ height: 2 }} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={[styles.shelf, styles.rowAround]}>
        <WeatherForecast currentWeather={currentWeather} />
      </ScrollView>
      <Divider style={{ height: 2 }} />
      <View style={[styles.shelf, styles.airShelf]}>
        <WindAndHumidity currentWeatherCurrent={currentWeather.current} />
      </View>

      <Divider style={{ height: 2 }} />

      <View style={[styles.shelf]}>
        <AirPollution air_quality={currentWeather.current.air_quality} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  shelf: { flex: 1, marginVertical: "3%" },
  rowAround: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  currentTemperature: {
    fontSize: 70,
    fontWeight: "bold",
  },
  currentWeatherIcon: { width: 100, height: 100 },
  currentWeatherInfo: { fontStyle: "italic", textAlign: "center" },
  forecastShelf: { width: "33.33%", padding: 10 },
  centerText: { textAlign: "center" },
  forecastTemperature: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forecastWeatherIcon: { height: 50, width: 50 },
  forecastDivider: { borderRightWidth: 1, height: "100%" },

  airShelf: { flexDirection: "row", justifyContent: "space-around" },
  iconMargin: { marginRight: "4%" },

  surface: {
    // elevation: 4,
    padding: "1%",
  },
});

export default DisplayWeatherInfo;
