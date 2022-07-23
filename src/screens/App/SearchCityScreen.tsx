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
  ActivityIndicator,
  Avatar,
  List,
  Paragraph,
  Searchbar,
  TouchableRipple,
} from "react-native-paper";

interface SearchCityScreenProps {}
const SearchCityScreen: React.FC<SearchCityScreenProps> = ({}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [citiesQuery, setCitiesQuery] = React.useState<
    cityInterface[] | errorInterface
  >([]);
  const [searching, setSearching] = React.useState(false);
  const { searchCity } = useWeather();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    search(query);
  };

  const search = async (query: string) => {
    setSearching(true);
    const res = await searchCity(query);

    setCitiesQuery(res);
    setSearching(false);
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
        style={{ marginHorizontal: "2%" }}
      />
      {searching ? <ActivityIndicator style={{ margin: "5%" }} /> : null}
      {!Array.isArray(citiesQuery) ? (
        <Paragraph style={{ textAlign: "center" }}>No result</Paragraph>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {citiesQuery.map((city, i) => (
            <TouchableRipple
              key={i}
              onPress={() => changeLocation(`${city.name}, ${city.country}`)}>
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
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SearchCityScreen;
