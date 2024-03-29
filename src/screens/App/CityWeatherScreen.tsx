import {
  toggleTheme,
  useAppDispatch,
  useAppSelector,
} from "@/hooks/reduxHooks";
import { useWeather } from "@/hooks/useWeather/useWeather";
import * as React from "react";
import {
  LayoutAnimation,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { Divider } from "react-native-paper";
import Layout from "@/constants/Layout";
import { weatherForecastInterface } from "@/hooks/useWeather/weatherHookHelpers";
import DisplayWeatherInfo from "@/components/WeatherInfo/DisplayWeatherInfo";
import Header from "@/components/Header";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

interface CityWeatherScreenProps {}

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
  const isDarkTheme = useAppSelector(
    (state) => state.DarkThemeReducer.isDarkTheme
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (location) {
      getCityForecast(location);
    }
  }, [location]);

  const getCityForecast = async (cityName: string) => {
    const weather = await getCityWeatherForecast(cityName, 3, true, false);

    if (weather && "current" in weather) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      if (weather.current.is_day && isDarkTheme) {
        dispatch(toggleTheme());
      } else if (!weather.current.is_day && !isDarkTheme) {
        dispatch(toggleTheme());
      }
      setCurrentWeather(weather);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        paddingTop: Layout.statusBarHeight,
        marginHorizontal: "2%",
      }}>
      <Header location={location} />
      <Divider style={{ height: 2 }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {currentWeather ? (
          <DisplayWeatherInfo currentWeather={currentWeather} />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default CityWeatherScreen;
