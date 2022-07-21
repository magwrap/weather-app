import Center from "@/components/Center";
import * as React from "react";
import { Divider, Title } from "react-native-paper";

interface SearchCityScreenProps {
  navigation: any;
}

const SearchCityScreen: React.FC<SearchCityScreenProps> = ({ navigation }) => {
  return (
    <Center>
      <Title>Tab Two</Title>
      <Divider />
    </Center>
  );
};

export default SearchCityScreen;
