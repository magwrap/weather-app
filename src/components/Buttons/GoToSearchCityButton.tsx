import { ScreenNames } from "@/navigation/ScreenNames";
import { FontSizes, IconSizes } from "@/styles/Fonts";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { LayoutAnimation, StyleSheet, Text, View } from "react-native";
import { Button, IconButton, useTheme } from "react-native-paper";

interface GoToSearchCityButtonProps {}

const GoToSearchCityButton: React.FC<GoToSearchCityButtonProps> = ({}) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const openSearchScreen = () => {
    navigation.navigate(ScreenNames.SEARCH_CITY_SC);
  };
  return (
    <IconButton
      onPress={openSearchScreen}
      icon={() => (
        <MaterialIcons
          name="search"
          size={IconSizes.NORMAL}
          color={colors.primary}
        />
      )}
    />
  );
};
const styles = StyleSheet.create({});

export default GoToSearchCityButton;
