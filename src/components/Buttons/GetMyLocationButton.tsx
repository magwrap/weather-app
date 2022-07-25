import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, IconButton, useTheme } from "react-native-paper";
import * as Location from "expo-location";
import { BING_MAPS_KEY } from "API_KEY";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setLocation } from "@/state";
import { MaterialIcons } from "@expo/vector-icons";
import { IconSizes } from "@/styles/Fonts";

interface GetMyLocationButtonProps {}

const GetMyLocationButton: React.FC<GetMyLocationButtonProps> = ({}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [permissionGranted, setPermissionGranted] = useState(false);

  const dispatch = useAppDispatch();
  const location = useAppSelector((state) => state.LocationReducer.location);
  const { colors } = useTheme();

  useEffect(() => {
    if (!location) {
      getMyLocation();
    }
  }, []);

  const getMyLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setPermissionGranted(false);
      return;
    }
    setPermissionGranted(true);
    let currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.Low,
    });

    const fetch = require("node-fetch");

    const url = `http://dev.virtualearth.net/REST/v1/Locations/${currentLocation.coords.latitude},${currentLocation.coords.longitude}?o=json&key=${BING_MAPS_KEY}`;

    try {
      const res = await fetch(url);
      const resJSON = await res.json();

      dispatch(
        setLocation(
          resJSON.resourceSets[0].resources[0].address["formattedAddress"]
        )
      );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <IconButton
        onPress={getMyLocation}
        icon={() => (
          <MaterialIcons
            name={permissionGranted ? "gps-fixed" : "gps-not-fixed"}
            size={IconSizes.NORMAL}
            color={colors.primary}
            //TODO: dodac animacje do ikony lokacji
          />
        )}
      />
      {/* TODO: alertuje error message jesli sie pojawi jakas */}
    </>
  );
};
const styles = StyleSheet.create({});

export default GetMyLocationButton;
