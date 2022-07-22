import GoToCityWeatherButton from "@/components/Buttons/GoToCityWeatherButton";
import Layout from "@/constants/Layout";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useWeather } from "@/hooks/useWeather/useWeather";
import {
  cityInterface,
  errorInterface,
} from "@/hooks/useWeather/weatherHookHelpers";
import { setLocation } from "@/state";
import { IconSizes } from "@/styles/Fonts";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { ScrollView, View } from "react-native";
import {
  Avatar,
  List,
  Paragraph,
  Searchbar,
  TouchableRipple,
} from "react-native-paper";

interface SearchCityScreenProps {}
//TODO: zrobic szukanie miast i ustawia to lokacje
//React native paper list
const SearchCityScreen: React.FC<SearchCityScreenProps> = ({}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [citiesQuery, setCitiesQuery] = React.useState<
    cityInterface[] | errorInterface
  >([]);
  const { searchCity } = useWeather();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    search(query);
  };

  const search = async (query: string) => {
    const res = await searchCity(query);
    console.log(res);
    setCitiesQuery(res);
  };

  const changeLocation = (cityName: string) => {
    dispatch(setLocation(cityName));
    navigation.goBack();
  };

  return (
    <View style={{ paddingTop: Layout.statusBarHeight, flex: 1 }}>
      <Searchbar
        icon={() => <GoToCityWeatherButton />}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {!Array.isArray(citiesQuery) ? (
        <Paragraph>No result</Paragraph>
      ) : (
        <ScrollView>
          {citiesQuery.map((city) => (
            <TouchableRipple
              onPress={() => changeLocation(`${city.name}, ${city.country}`)}>
              <List.Item
                title={city.name}
                description={city.country}
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
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SearchCityScreen;
