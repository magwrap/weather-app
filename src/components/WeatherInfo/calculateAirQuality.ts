import { AirPollutonColors } from "@/styles/ColorPallete";

export const calculateAirQuality = (AQI: number): AirQuality => {
  if (AQI >= 0 && AQI <= 50)
    return { text: "Good", color: AirPollutonColors.GREEN, categoryNum: 1 };
  else if (AQI >= 51 && AQI <= 100)
    return {
      text: "Moderate",
      color: AirPollutonColors.YELLOW,
      categoryNum: 2,
    };
  else if (AQI >= 101 && AQI <= 150)
    return {
      text: "Unhealthy for Sensitive",
      color: AirPollutonColors.ORANGE,
      categoryNum: 3,
    };
  else if (AQI >= 151 && AQI <= 200)
    return { text: "Unhealthy", color: AirPollutonColors.RED, categoryNum: 4 };
  else if (AQI >= 201 && AQI <= 300)
    return {
      text: "Very Unhealthy",
      color: AirPollutonColors.PURPLE,
      categoryNum: 5,
    };
  else if (AQI >= 301)
    return {
      text: "Hazardous",
      color: AirPollutonColors.MAROON,
      categoryNum: 6,
    };

  return {
    text: "No data",
    color: "grey",
    categoryNum: 0,
  };
};
