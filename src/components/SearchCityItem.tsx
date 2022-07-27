import { useAppDispatch } from "@/hooks/reduxHooks";
import { cityInterface } from "@/hooks/useWeather/weatherHookHelpers";
import { setLocation } from "@/state";
import { IconSizes } from "@/styles/Fonts";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { LayoutAnimation, StyleSheet, View } from "react-native";
import { Avatar, List, TouchableRipple } from "react-native-paper";

interface SearchCityItemProps {
  city: cityInterface;
}

const SearchCityItem: React.FC<SearchCityItemProps> = ({ city }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const changeLocation = (cityName: string) => {
    dispatch(setLocation(cityName));
    navigation.goBack();
  };

  const onPress = () => {
    changeLocation(`${city.name}, ${city.country}`);
  };

  return (
    <TouchableRipple onPress={onPress}>
      <List.Item
        title={city.name}
        description={city.country}
        style={{
          backgroundColor: "rgba(0,0,0,0.04)",
          marginVertical: "0.5%",
        }}
        left={(props) => (
          <View style={{ justifyContent: "center" }}>
            <Avatar.Image
              {...props}
              source={{
                uri: `https://countryflagsapi.com/png/${city.country}`,
              }}
              size={IconSizes.LARGE}
            />
          </View>
        )}
      />
    </TouchableRipple>
  );
};
const styles = StyleSheet.create({});

export default SearchCityItem;
