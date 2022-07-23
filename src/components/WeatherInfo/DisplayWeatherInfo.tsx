import { weatherForecastInterface } from "@/hooks/useWeather/weatherHookHelpers";
import { current } from "@reduxjs/toolkit";
import React from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import {
  Subheading,
  Divider,
  Title,
  Caption,
  Paragraph,
  useTheme,
} from "react-native-paper";

interface DisplayWeatherInfoProps {
  currentWeather: weatherForecastInterface;
}

const DisplayWeatherInfo: React.FC<DisplayWeatherInfoProps> = ({
  currentWeather,
}) => {
  const { colors } = useTheme();
  return (
    <>
      <View style={styles.shelf}>
        <View style={styles.rowAround}>
          <View style={{ alignItems: "flex-start" }}>
            <Text
              style={[styles.currentTemperature, { color: colors.primary }]}>
              {currentWeather.current.temp_c}
              {"°C"}
            </Text>
            <Caption>
              {currentWeather.current.feelslike_c}
              {"°C"}
            </Caption>
          </View>
          <Image
            source={{
              uri: "https:" + currentWeather?.current.condition.icon,
            }}
            style={styles.currentWeatherIcon}
          />
        </View>
        <Subheading style={styles.currentWeatherInfo}>
          Weather: {currentWeather.current.condition.text}
        </Subheading>
      </View>
      <Divider style={{ height: 2 }} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={[styles.shelf, styles.rowAround]}>
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
                  {diff === 0
                    ? "Today"
                    : diff === -1
                    ? "Tommorow"
                    : "Coming day"}
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
      </ScrollView>
      <Divider style={{ height: 2 }} />
      <View style={[styles.shelf, styles.airShelf]}>
        {/* TODO: zrobic jakies animacje z tymi ikonami, wybrac ladniejsze */}

        <View style={styles.airProps}>
          <Image
            source={require("../../../assets/images/humidity.png")}
            style={[styles.forecastWeatherIcon, styles.iconMargin]}
          />
          <Subheading>Humidity: {currentWeather.current.humidity}%</Subheading>
        </View>
        <View style={styles.airProps}>
          <Image
            source={require("../../../assets/images/wind.png")}
            style={[styles.forecastWeatherIcon, styles.iconMargin]}
          />
          <Subheading>
            Wind: {currentWeather.current.gust_kph} kph{" "}
            {currentWeather.current.wind_dir}
          </Subheading>
        </View>
      </View>

      <Divider style={{ height: 2 }} />
      <View style={[styles.shelf, { flexDirection: "row" }]}>
        <View style={styles.airPollutionShelf}>
          <Caption style={styles.pollutionType}>Particulate Matter</Caption>
          <Caption>
            pm10: {currentWeather.current.air_quality?.pm10.toPrecision(3)}
          </Caption>
          <Caption>
            pm2_5: {currentWeather.current.air_quality?.pm2_5.toPrecision(3)}
          </Caption>
        </View>
        <View style={styles.airPollutionShelf}>
          <Caption style={styles.pollutionType}>Carbon Monoxide</Caption>
          <Caption>
            co: {currentWeather.current.air_quality?.co.toPrecision(3)}
          </Caption>
        </View>
        <View style={styles.airPollutionShelf}>
          <Caption style={styles.pollutionType}>Ozone</Caption>
          <Caption>
            o3: {currentWeather.current.air_quality?.o3.toPrecision(3)}
          </Caption>
        </View>
        <View style={styles.airPollutionShelf}>
          <Caption style={styles.pollutionType}>Nitrogen Dioxide</Caption>
          <Caption>
            no3: {currentWeather.current.air_quality?.no2.toPrecision(3)}
          </Caption>
        </View>
        <View style={[styles.airPollutionShelf, { borderRightWidth: 0 }]}>
          <Caption style={styles.pollutionType}>Sulfur Dioxide</Caption>
          <Caption>
            so3: {currentWeather.current.air_quality?.so2.toPrecision(3)}
          </Caption>
        </View>
      </View>
    </>
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
  airProps: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  airShelf: { flexDirection: "row", justifyContent: "space-around" },
  iconMargin: { marginRight: "4%" },
  airPollutionShelf: {
    width: "20%",
    alignItems: "center",
    borderRightWidth: 1,
  },
  pollutionType: { fontWeight: "bold", height: "40%" },
});

export default DisplayWeatherInfo;
