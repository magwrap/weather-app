import { WEATHER_KEY } from "API_KEY";

export enum API_CALLS {
  CURRENT = "current.json",
  FORECAST = "forecast.json",
  SEARCH = "search.json",
}

export const createApiUrl = (apiCall: API_CALLS, query: string, extra = "") => {
  return `https://api.weatherapi.com/v1/${apiCall}?key=${WEATHER_KEY}&q=${query}${extra}`;
};

export const WEATHER_ERROR: errorInterface = {
  code: 1,
  message: "Something went wrong on your side...",
};

export interface errorInterface {
  code: number;
  message: string;
}

export interface cityInterface {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export interface currentWeatherInterface {
  current: currentInterface;
  location: locationInterface;
}

export interface weatherForecastInterface {
  current: currentInterface;
  location: locationInterface;
  forecast: {
    forecastday: oneDayForecastInterface[];
  };
}

interface currentInterface {
  air_quality?: {
    co: number;
    "gb-defra-index": number;
    no2: number;
    o3: number;
    pm10: number;
    pm2_5: number;
    so2: number;
    "us-epa-index": number;
  };
  cloud: number;
  condition: {
    code: number;
    icon: string;
    text: string;
  };
  feelslike_c: number;
  feelslike_f: number;
  gust_kph: number;
  gust_mph: number;
  humidity: number;
  is_day: number;
  last_updated: string;
  last_updated_epoch: number;
  precip_in: number;
  precip_mm: number;
  pressure_in: number;
  pressure_mb: number;
  temp_c: number;
  temp_f: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  wind_degree: number;
  wind_dir: "W" | "E" | "N" | "S";
  wind_kph: number;
  wind_mph: number;
}

interface locationInterface {
  country: string;
  lat: number;
  localtime: string;
  localtime_epoch: number;
  lon: number;
  name: string;
  region: string;
  tz_id: string;
}

interface oneHourForecastInterface {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
    code: string;
  };
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: "S" | "N" | "E" | "W";
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
}

interface oneDayForecastInterface {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
  };
  hour: oneHourForecastInterface[];
}
