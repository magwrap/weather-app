import GoToCityWeatherButton from "@/components/Buttons/GoToCityWeatherButton";
import SearchCityItem from "@/components/SearchCityItem";
import Layout from "@/constants/Layout";
import { useWeather } from "@/hooks/useWeather/useWeather";
import {
  cityInterface,
  errorInterface,
} from "@/hooks/useWeather/weatherHookHelpers";
import * as React from "react";
import { Keyboard, LayoutAnimation, ScrollView, View } from "react-native";
import { ActivityIndicator, Paragraph, Searchbar } from "react-native-paper";

interface SearchCityScreenProps {}
const SearchCityScreen: React.FC<SearchCityScreenProps> = ({}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [citiesQuery, setCitiesQuery] = React.useState<
    cityInterface[] | errorInterface
  >([]);
  const [searching, setSearching] = React.useState(false);
  const { searchCity } = useWeather();

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    search(query);
  };

  const search = async (query: string) => {
    setSearching(true);
    try {
      const res = await searchCity(query);
      setCitiesQuery(res);
      setSearching(false);
    } catch {
      setSearching(false);
    }
  };

  const ViewActivityIndicator = () => {
    if (searching) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      return <ActivityIndicator style={{ margin: "5%" }} />;
    }
    return <View />;
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

      {!Array.isArray(citiesQuery) ? (
        <Paragraph style={{ textAlign: "center" }}>No result</Paragraph>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {citiesQuery.map((city, i) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            return <SearchCityItem city={city} key={i} />;
          })}
          {/* <ViewActivityIndicator /> */}
        </ScrollView>
      )}
    </View>
  );
};

export default SearchCityScreen;
