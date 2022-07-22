import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, IconButton, useTheme } from "react-native-paper";
import * as Location from "expo-location";
import { BING_MAPS_KEY } from "API_KEY";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setLocation } from "@/state";
import { MaterialIcons } from "@expo/vector-icons";
import { IconSizes } from "@/styles/Fonts";

interface GetMyLocationButtonProps {}

const GetMyLocationButton: React.FC<GetMyLocationButtonProps> = ({}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [permissionGranted, setPermissionGranted] = useState(false);

  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  useEffect(() => {
    getMyLocation();
  }, []);

  const getMyLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      setPermissionGranted(false);
      return;
    }
    setPermissionGranted(true);
    let location = await Location.getCurrentPositionAsync({});
    const fetch = require("node-fetch");

    const url = `http://dev.virtualearth.net/REST/v1/Locations/${location.coords.latitude},${location.coords.longitude}?o=json&key=${BING_MAPS_KEY}`;

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
