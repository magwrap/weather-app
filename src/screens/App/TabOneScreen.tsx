import Center from "@/components/Center";
import DarkThemeSwitch from "@/components/DarkThemeSwitch";
import { useWeather } from "@/hooks/useWeather/useWeather";
import * as React from "react";
import { Avatar, Button, Divider, Title } from "react-native-paper";

interface TabOneScreenProps {
  navigation: any;
}

const TabOneScreen: React.FC<TabOneScreenProps> = ({ navigation }) => {
  const [weatherIcon, setWeatherIcon] = React.useState("");
  const { getCityWeatherForecast } = useWeather();
  const onPress = async () => {
    const weather = await getCityWeatherForecast("Rybnik", 1, false, false);
    console.log(weather);
    if (weather && "current" in weather) {
      console.log(weather?.current.condition.icon);
      setWeatherIcon(weather?.current.condition.icon);
    }
  };
  return (
    <Center>
      <Title>Tab One</Title>
      <Button mode="contained" onPress={onPress}>
        Press Me
      </Button>
      <Divider />
      <Avatar.Image size={54} source={{ uri: "https:" + weatherIcon }} />
      <DarkThemeSwitch />
    </Center>
  );
};

export default TabOneScreen;
