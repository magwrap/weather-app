import { useAppDispatch } from "@/hooks/reduxHooks";
import { cityInterface } from "@/hooks/useWeather/weatherHookHelpers";
import { setLocation } from "@/state";
import { IconSizes } from "@/styles/Fonts";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
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
        style={styles.listItem}
        left={(props) => (
          <View style={styles.avatar}>
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
const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "rgba(0,0,0,0.04)",
    marginVertical: "0.5%",
  },
  avatar: { justifyContent: "center" },
});

export default SearchCityItem;
