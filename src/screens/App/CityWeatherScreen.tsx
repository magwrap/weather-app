import Center from "@/components/Center";
import DarkThemeSwitch from "@/components/DarkThemeSwitch";
import GetMyLocationButton from "@/components/GetMyLocationButton";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useWeather } from "@/hooks/useWeather/useWeather";
import * as React from "react";
import { Avatar, Divider, Paragraph } from "react-native-paper";

interface CityWeatherScreenProps {}
//TODO: utworzyc interfejsy do konsumpsji api
const CityWeatherScreen: React.FC<CityWeatherScreenProps> = ({}) => {
  const [weatherIcon, setWeatherIcon] = React.useState("");
  const { getCityWeatherForecast } = useWeather();
  const location = useAppSelector((state) => state.LocationReducer.location);

  React.useEffect(() => {
    console.log("location: ", location);
    if (location) getCityForecast(location);
  }, [location]);

  const getCityForecast = async (cityName: string) => {
    const weather = await getCityWeatherForecast(cityName, 1, false, false);

    if (weather && "current" in weather) {
      console.log(weather?.current.condition.icon);
      setWeatherIcon(weather?.current.condition.icon);
    }
  };

  return (
    <Center>
      <Paragraph>{location}</Paragraph>
      <GetMyLocationButton />
      <Divider />
      <Avatar.Image size={54} source={{ uri: "https:" + weatherIcon }} />
      <DarkThemeSwitch />
    </Center>
  );
};

export default CityWeatherScreen;
