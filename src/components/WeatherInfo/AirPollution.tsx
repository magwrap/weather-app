import { currentWeatherInterface } from "@/hooks/useWeather/weatherHookHelpers";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Caption, Paragraph } from "react-native-paper";
import { calculateAirQuality } from "./calculateAirQuality";
import PollutionMatter from "./PollutionMatter";

interface AirPollutionProps {
  air_quality: currentWeatherInterface["current"]["air_quality"];
}

const AirPollution: React.FC<AirPollutionProps> = ({ air_quality }) => {
  if (air_quality === undefined) {
    return <></>;
  }
  const pm10AirQuality = calculateAirQuality(air_quality.pm10);
  const pm2_5AirQuality = calculateAirQuality(air_quality.pm2_5);
  const coAirQuality = calculateAirQuality(air_quality.co);
  const o3AirQuality = calculateAirQuality(air_quality.o3);
  const no2AirQuality = calculateAirQuality(air_quality.no2);
  const so2AirQuality = calculateAirQuality(air_quality.so2);

  return (
    <>
      <View style={styles.airPollutionShelf}>
        <Paragraph style={styles.pollutionType}>Particulate Matter</Paragraph>
        <PollutionMatter
          airQuality={pm10AirQuality}
          pollutionInfo={`pm10: ${air_quality?.pm10.toPrecision(
            3
          )}\npm2.5: ${air_quality?.pm2_5.toPrecision(3)}`}
        />
      </View>
      <View style={styles.airPollutionShelf}>
        <Paragraph style={styles.pollutionType}>Carbon Monoxide</Paragraph>
        <PollutionMatter
          airQuality={coAirQuality}
          pollutionInfo={`co: ${air_quality?.co.toPrecision(3)}`}
        />
      </View>
      <View style={styles.airPollutionShelf}>
        <Paragraph style={styles.pollutionType}>Ozone</Paragraph>
        <PollutionMatter
          airQuality={o3AirQuality}
          pollutionInfo={`o3: ${air_quality?.o3.toPrecision(3)}`}
        />
      </View>
      <View style={styles.airPollutionShelf}>
        <Paragraph style={styles.pollutionType}>Nitrogen Dioxide</Paragraph>
        <PollutionMatter
          airQuality={no2AirQuality}
          pollutionInfo={`no2: ${air_quality?.no2.toPrecision(3)}`}
        />
      </View>
      <View style={[styles.airPollutionShelf, { borderRightWidth: 0 }]}>
        <Paragraph style={styles.pollutionType}>Sulfur Dioxide</Paragraph>
        <PollutionMatter
          airQuality={so2AirQuality}
          pollutionInfo={`so2: ${air_quality?.so2.toPrecision(3)}`}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  airPollutionShelf: {
    width: "20%",
    alignItems: "center",

    borderRightWidth: 0.5,
    padding: 0.5,
  },
  pollutionType: { fontWeight: "bold", textAlign: "center", height: 40 },
});

export default AirPollution;
