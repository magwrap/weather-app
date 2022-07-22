import DarkThemeSwitch from "@/components/DarkThemeSwitch";
import GetMyLocationButton from "@/components/Buttons/GetMyLocationButton";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useWeather } from "@/hooks/useWeather/useWeather";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View } from "react-native";
import { Avatar, Divider, Paragraph } from "react-native-paper";
import GoToSearchCityButton from "@/components/Buttons/GoToSearchCityButton";
import Layout from "@/constants/Layout";

interface CityWeatherScreenProps {}
//TODO: utworzyc interfejsy do konsumpsji api
const CityWeatherScreen: React.FC<CityWeatherScreenProps> = ({}) => {
  const [weatherIcon, setWeatherIcon] = React.useState("");
  const { getCityWeatherForecast } = useWeather();
  const navigation = useNavigation();
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
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        paddingTop: Layout.statusBarHeight,
      }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <GoToSearchCityButton />
        <GetMyLocationButton />
      </View>
      <Paragraph>{location}</Paragraph>
      <Divider />
      <Avatar.Image size={54} source={{ uri: "https:" + weatherIcon }} />
      <DarkThemeSwitch />
    </View>
  );
};

export default CityWeatherScreen;
