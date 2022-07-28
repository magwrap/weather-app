import React, { useEffect, useState } from "react";
import { LayoutAnimation } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import * as Location from "expo-location";
import { BING_MAPS_KEY } from "API_KEY";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setLocation } from "@/state";
import { MaterialIcons } from "@expo/vector-icons";
import { IconSizes } from "@/styles/Fonts";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface GetMyLocationButtonProps {}

const GetMyLocationButton: React.FC<GetMyLocationButtonProps> = ({}) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const location = useAppSelector((state) => state.LocationReducer.location);
  const { colors } = useTheme();

  const scaleIcon = useSharedValue(1);

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleIcon.value }],
    };
  });

  useEffect(() => {
    if (!location) {
      getMyLocation();
    }
  }, []);

  useEffect(() => {
    if (loading) {
      scaleIcon.value = withRepeat(
        withTiming(1.4, { duration: 2000 }),
        -1,
        true
      );
    } else {
      // cancelAnimation(scaleIcon);
      scaleIcon.value = withTiming(1, { duration: 2000 });
    }
  }, [loading]);

  const getMyLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setPermissionGranted(false);
      return;
    }
    setPermissionGranted(true);
    setLoading(true);
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

      setLoading(false);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  return (
    <IconButton
      onPress={getMyLocation}
      icon={() => (
        <Animated.View style={iconAnimatedStyle}>
          <MaterialIcons
            name={permissionGranted ? "gps-fixed" : "gps-not-fixed"}
            size={IconSizes.NORMAL}
            color={colors.primary}
          />
        </Animated.View>
      )}
    />
  );
};

export default GetMyLocationButton;
