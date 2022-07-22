import DarkThemeSwitch from "@/components/DarkThemeSwitch";
import GetMyLocationButton from "@/components/Buttons/GetMyLocationButton";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useWeather } from "@/hooks/useWeather/useWeather";
import * as React from "react";
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { Divider, Headline, Title } from "react-native-paper";
import GoToSearchCityButton from "@/components/Buttons/GoToSearchCityButton";
import Layout from "@/constants/Layout";
import { weatherForecastInterface } from "@/hooks/useWeather/weatherHookHelpers";
import MyRefreshControl from "@/components/MyRefreshControl";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

interface CityWeatherScreenProps {}
//TODO: utworzyc interfejsy do konsumpsji api
const CityWeatherScreen: React.FC<CityWeatherScreenProps> = ({}) => {
  const [currentWeather, setCurrentWeather] =
    React.useState<weatherForecastInterface | null>(null);
  const { getCityWeatherForecast } = useWeather();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getCityForecast(location);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const location = useAppSelector((state) => state.LocationReducer.location);

  React.useEffect(() => {
    console.log("location: ", location);
    if (location) getCityForecast(location);
  }, [location]);

  const getCityForecast = async (cityName: string) => {
    const weather = await getCityWeatherForecast(cityName, 1, false, false);

    if (weather && "current" in weather) {
      console.log(weather?.current.condition.icon);
      setCurrentWeather(weather);
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
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Title style={{ alignSelf: "center" }}>{location}</Title>
        <Divider />
        {currentWeather ? (
          <ImageBackground
            source={{ uri: "https:" + currentWeather?.current.condition.icon }}
            style={{ height: 400 }}>
            <Headline>
              {currentWeather.current.temp_c}
              {"°"}
            </Headline>
            <Headline>{currentWeather.location.localtime}</Headline>
            <Headline>{currentWeather.current.condition.text}</Headline>
          </ImageBackground>
        ) : null}
      </ScrollView>
      <DarkThemeSwitch />
    </View>
  );
};

export default CityWeatherScreen;
