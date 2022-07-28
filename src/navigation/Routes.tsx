import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import AppStackNavigator from "./App/AppStackNavigator";

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = ({}) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <AppStackNavigator />
    </View>
  );
};

export default Routes;
