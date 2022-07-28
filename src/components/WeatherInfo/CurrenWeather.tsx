import { currentWeatherInterface } from "@/hooks/useWeather/weatherHookHelpers";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Caption, Subheading, useTheme } from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

interface CurrenWeatherProps {
  currentWeatherCurrent: currentWeatherInterface["current"];
}

const CurrenWeather: React.FC<CurrenWeatherProps> = ({
  currentWeatherCurrent,
}) => {
  const { colors } = useTheme();
  const textScale = useSharedValue(1);
  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: textScale.value }],
    };
  }, []);

  useEffect(() => {
    textScale.value = withRepeat(
      withTiming(1.09, { duration: 5000 }),
      -1,
      true
    );
  }, []);
  return (
    <>
      <View style={styles.rowAround}>
        <View style={{ alignItems: "flex-start" }}>
          <Animated.Text
            style={[
              styles.currentTemperature,
              { color: colors.primary },
              textAnimatedStyle,
            ]}>
            {currentWeatherCurrent.temp_c}
            {"°C"}
          </Animated.Text>

          <Caption>
            {currentWeatherCurrent.feelslike_c}
            {"°C"}
          </Caption>
        </View>
        <Image
          source={{
            uri: "https:" + currentWeatherCurrent.condition.icon,
          }}
          style={styles.currentWeatherIcon}
        />
      </View>
      <Subheading style={styles.currentWeatherInfo}>
        Weather: {currentWeatherCurrent.condition.text}
      </Subheading>
    </>
  );
};
const styles = StyleSheet.create({
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
});

export default CurrenWeather;
