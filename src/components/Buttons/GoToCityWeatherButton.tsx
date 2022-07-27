import { ScreenNames } from "@/navigation/ScreenNames";
import { IconSizes } from "@/styles/Fonts";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { IconButton, useTheme } from "react-native-paper";

interface GoToCityWeatherButtonProps {}

const GoToCityWeatherButton: React.FC<GoToCityWeatherButtonProps> = ({}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const goToCityWeather = () =>
    navigation.navigate(ScreenNames.CITY_WEATHER_SC);

  return (
    <IconButton
      onPress={goToCityWeather}
      icon={() => (
        <MaterialIcons
          name="arrow-back"
          size={IconSizes.NORMAL}
          color={colors.primary}
        />
      )}
    />
  );
};

export default GoToCityWeatherButton;
