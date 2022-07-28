import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CityWeatherScreen from "@/screens/App/CityWeatherScreen";
import { ScreenNames } from "../ScreenNames";
import SearchCityScreen from "@/screens/App/SearchCityScreen";

interface AppStackNavigatorProps {}

const Stack = createNativeStackNavigator();

const AppStackNavigator: React.FC<AppStackNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNames.CITY_WEATHER_SC}
        component={CityWeatherScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "formSheet" }}>
        <Stack.Screen
          name={ScreenNames.SEARCH_CITY_SC}
          component={SearchCityScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
