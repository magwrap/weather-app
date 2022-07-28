import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Caption } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface PollutonMatterProps {
  airQuality: AirQuality;
  pollutionInfo: string;
  showPollutionInfo: boolean;
  toggleShowPollutionInfo: () => void;
}

function PollutionMatter({
  airQuality,
  pollutionInfo,
  showPollutionInfo,
  toggleShowPollutionInfo,
}: PollutonMatterProps) {
  const toggleTextOpacity = () => {
    if (textOpacity.value === 0) textOpacity.value = withTiming(1);
    else if (textOpacity.value === 1) textOpacity.value = withTiming(0);
  };

  const onPress = () => {
    toggleShowPollutionInfo();
  };
  useEffect(() => {
    toggleTextOpacity();
  }, [showPollutionInfo]);
  const textOpacity = useSharedValue(showPollutionInfo ? 0 : 1);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  return (
    <>
      <Pressable onPress={onPress}>
        <Caption style={[styles.airQualityIndex, { color: airQuality.color }]}>
          {airQuality.text}
        </Caption>
      </Pressable>

      <Animated.View style={animatedTextStyle}>
        <Caption style={styles.pollutionInfo}>{pollutionInfo}</Caption>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  airQualityIndex: { textAlign: "center" },
  pollutionInfo: { fontStyle: "italic" },
});

export default PollutionMatter;
