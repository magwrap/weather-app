import { weatherForecastInterface } from "@/hooks/useWeather/weatherHookHelpers";
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Caption, Paragraph, Title, useTheme } from "react-native-paper";

interface WeatherForecastProps {
  currentWeather: weatherForecastInterface;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  currentWeather,
}) => {
  const { colors } = useTheme();
  return (
    <>
      {currentWeather.forecast.forecastday.map((forecastDay, i) => {
        const date = forecastDay.date.split("-");
        const today = currentWeather.location.localtime
          .split("-")[2]
          .split(" ")[0];
        const diff = +today - +date[2];

        return (
          <React.Fragment key={i}>
            <View style={styles.forecastShelf}>
              <Title style={[styles.centerText, { color: colors.accent }]}>
                {date[2]}.{date[1]}
              </Title>
              <Caption style={styles.centerText}>
                {diff === 0 ? "Today" : diff === -1 ? "Tommorow" : "Coming day"}
              </Caption>
              <View style={styles.forecastTemperature}>
                <View>
                  <Paragraph>
                    {forecastDay.day.mintemp_c}
                    {"°C"}
                  </Paragraph>
                  <Paragraph style={{ paddingLeft: 5 }}>
                    {forecastDay.day.maxtemp_c}
                    {"°C"}
                  </Paragraph>
                </View>
                <Image
                  source={{
                    uri: "https:" + forecastDay.day.condition.icon,
                  }}
                  style={styles.forecastWeatherIcon}
                />
              </View>
              <Caption style={styles.centerText}>
                {forecastDay.day.condition.text}
              </Caption>
            </View>

            {i >= 0 && i < currentWeather.forecast.forecastday.length - 1 ? (
              <View style={styles.forecastDivider} />
            ) : null}
          </React.Fragment>
        );
      })}
    </>
  );
};
const styles = StyleSheet.create({
  forecastShelf: { width: "33.33%", padding: 10 },
  centerText: { textAlign: "center" },
  forecastTemperature: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forecastWeatherIcon: { height: 50, width: 50 },
  forecastDivider: { borderRightWidth: 1, height: "100%" },
});

export default WeatherForecast;
