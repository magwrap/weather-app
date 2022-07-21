import React from "react";
import ModalScreen from "@/screens/App/ModalScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CityWeatherScreen from "@/screens/App/CityWeatherScreen";

interface AppStackNavigatorProps {}

const Stack = createNativeStackNavigator();

const AppStackNavigator: React.FC<AppStackNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={CityWeatherScreen}
        options={{ headerShown: false }}
      />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        {/* zewnetrzny poza tabsami */}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
