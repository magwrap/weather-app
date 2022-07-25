import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Caption } from "react-native-paper";

interface PollutonMatterProps {
  airQuality: AirQuality;
  pollutionInfo: string;
}

function PollutionMatter({ airQuality, pollutionInfo }: PollutonMatterProps) {
  const [showPollutionInfo, setShowPollutionInfo] = useState(false);
  const toggleShowPollutionInfo = () =>
    setShowPollutionInfo(!showPollutionInfo);
  return (
    <>
      <Pressable onPress={toggleShowPollutionInfo}>
        <Caption style={[styles.airQualityIndex, { color: airQuality.color }]}>
          {airQuality.text}
        </Caption>
      </Pressable>
      {showPollutionInfo ? (
        <>
          <Caption style={styles.pollutionInfo}>{pollutionInfo}</Caption>
        </>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  airQualityIndex: { textAlign: "center" },
  pollutionInfo: { fontStyle: "italic" },
});

export default PollutionMatter;
