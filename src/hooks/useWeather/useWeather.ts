import {
  API_CALLS,
  cityInterface,
  createApiUrl,
  currentWeatherInterface,
  errorInterface,
  weatherForecastInterface,
  WEATHER_ERROR,
} from "./weatherHookHelpers";
//https://www.weatherapi.com/ --> API
const useWeather = () => {
  const getCityCurrentWeather = async (
    cityName: string,
    airQuality: boolean
  ) => {
    const url = createApiUrl(
      API_CALLS.CURRENT,
      cityName,
      `&aqi=${airQuality ? "yes" : "no"}`
    );
    try {
      const res = await fetch(url);
      const resJSON: currentWeatherInterface | errorInterface =
        await res.json();
      return resJSON;
    } catch {
      return WEATHER_ERROR;
    }
  };

  const getCityWeatherForecast = async (
    cityName: string,
    days: number,
    airQuality: boolean,
    alerts: boolean
  ) => {
    const url = createApiUrl(
      API_CALLS.FORECAST,
      cityName,
      `&days=${days}&aqi=${airQuality ? "yes" : "no"}&alerts=${
        alerts ? "yes" : " no"
      }
`
    );
    try {
      const res = await fetch(url);
      const resJSON: weatherForecastInterface | errorInterface =
        await res.json();
      return resJSON;
    } catch {
      return WEATHER_ERROR;
    }
  };

  const searchCity = async (cityName: string) => {
    const url = createApiUrl(API_CALLS.SEARCH, cityName);
    try {
      const res = await fetch(url);
      const resJSON: cityInterface[] | errorInterface = await res.json();
      return resJSON;
    } catch {
      return WEATHER_ERROR;
    }
  };

  return { getCityCurrentWeather, getCityWeatherForecast, searchCity };
};

export { useWeather };
