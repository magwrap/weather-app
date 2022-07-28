import { currentWeatherInterface } from "@/hooks/useWeather/weatherHookHelpers";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Paragraph, Subheading } from "react-native-paper";
import { calculateAirQuality } from "./calculateAirQuality";
import PollutionMatter from "./PollutionMatter";

interface AirPollutionProps {
  air_quality: currentWeatherInterface["current"]["air_quality"];
}

const AirPollution: React.FC<AirPollutionProps> = ({ air_quality }) => {
  if (air_quality === undefined) {
    return <></>;
  }
  const [showPollutionInfo, setShowPollutionInfo] = useState(false);
  const toggleShowPollutionInfo = () =>
    setShowPollutionInfo(!showPollutionInfo);

  const pm10AirQuality = calculateAirQuality(air_quality.pm10);
  const pm2_5AirQuality = calculateAirQuality(air_quality.pm2_5);
  const coAirQuality = calculateAirQuality(air_quality.co);
  const o3AirQuality = calculateAirQuality(air_quality.o3);
  const no2AirQuality = calculateAirQuality(air_quality.no2);
  const so2AirQuality = calculateAirQuality(air_quality.so2);

  const overall = calculateAirQuality(
    ((pm10AirQuality.categoryNum +
      pm2_5AirQuality.categoryNum +
      coAirQuality.categoryNum +
      o3AirQuality.categoryNum +
      no2AirQuality.categoryNum +
      so2AirQuality.categoryNum) /
      6) *
      50
  );

  return (
    <>
      <Subheading style={styles.AQI}>Air Quality Index</Subheading>
      <View style={styles.row}>
        <View style={styles.airPollutionShelf}>
          <Paragraph style={styles.pollutionType}>Particulate Matter</Paragraph>
        </View>
        <View style={styles.airPollutionShelf}>
          <Paragraph style={styles.pollutionType}>Carbon Monoxide</Paragraph>
        </View>
        <View style={styles.airPollutionShelf}>
          <Paragraph style={styles.pollutionType}>Ozone</Paragraph>
        </View>
        <View style={styles.airPollutionShelf}>
          <Paragraph style={styles.pollutionType}>Nitrogen Dioxide</Paragraph>
        </View>
        <View style={[styles.airPollutionShelf, { borderRightWidth: 0 }]}>
          <Paragraph style={styles.pollutionType}>Sulfur Dioxide</Paragraph>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.airPollutionShelf}>
          <PollutionMatter
            showPollutionInfo={showPollutionInfo}
            toggleShowPollutionInfo={toggleShowPollutionInfo}
            airQuality={pm10AirQuality}
            pollutionInfo={`pm10: ${air_quality?.pm10.toPrecision(
              3
            )}\npm2.5: ${air_quality?.pm2_5.toPrecision(3)}`}
          />
        </View>
        <View style={styles.airPollutionShelf}>
          <PollutionMatter
            showPollutionInfo={showPollutionInfo}
            toggleShowPollutionInfo={toggleShowPollutionInfo}
            airQuality={coAirQuality}
            pollutionInfo={`co: ${air_quality?.co.toPrecision(3)}`}
          />
        </View>
        <View style={styles.airPollutionShelf}>
          <PollutionMatter
            showPollutionInfo={showPollutionInfo}
            toggleShowPollutionInfo={toggleShowPollutionInfo}
            airQuality={o3AirQuality}
            pollutionInfo={`o3: ${air_quality?.o3.toPrecision(3)}`}
          />
        </View>
        <View style={styles.airPollutionShelf}>
          <PollutionMatter
            showPollutionInfo={showPollutionInfo}
            toggleShowPollutionInfo={toggleShowPollutionInfo}
            airQuality={no2AirQuality}
            pollutionInfo={`no2: ${air_quality?.no2.toPrecision(3)}`}
          />
        </View>
        <View style={styles.airPollutionShelf}>
          <PollutionMatter
            showPollutionInfo={showPollutionInfo}
            toggleShowPollutionInfo={toggleShowPollutionInfo}
            airQuality={so2AirQuality}
            pollutionInfo={`so2: ${air_quality?.so2.toPrecision(3)}`}
          />
        </View>
      </View>

      <Subheading style={styles.overall}>
        Overall:{" "}
        <Subheading style={{ color: overall.color }}>{overall.text}</Subheading>
      </Subheading>
    </>
  );
};
const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  airPollutionShelf: {
    width: "20%",
    alignItems: "center",
  },
  pollutionType: { fontWeight: "bold", textAlign: "center" },
  overall: {
    textAlign: "center",
    letterSpacing: 1.5,
    fontStyle: "italic",
    marginTop: "2%",
  },
  AQI: {
    textAlign: "center",
    marginVertical: "2%",
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
});

export default AirPollution;
