export const calculateAirQuality = (AQI: number): AirQuality => {
  if (AQI >= 0 && AQI <= 50)
    return { text: "Good", color: "#00e400", categoryNum: 1 };
  else if (AQI >= 51 && AQI <= 100)
    return { text: "Moderate", color: "#ffff00", categoryNum: 1 };
  else if (AQI >= 101 && AQI <= 150)
    return {
      text: "Unhealthy for Some",
      color: "#ff7e00",
      categoryNum: 1,
    };
  else if (AQI >= 151 && AQI <= 200)
    return { text: "Unhealthy", color: "#ff0000", categoryNum: 1 };
  else if (AQI >= 201 && AQI <= 300)
    return { text: "Very Unhealthy", color: "#8f3f97", categoryNum: 1 };
  else if (AQI >= 301 && AQI <= 500)
    return { text: "Hazardous", color: "#7e0023", categoryNum: 1 };

  return {
    text: "No data",
    color: "grey",
    categoryNum: 0,
  };
};
