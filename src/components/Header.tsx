import React from "react";
import { StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";
import GetMyLocationButton from "./Buttons/GetMyLocationButton";
import GoToSearchCityButton from "./Buttons/GoToSearchCityButton";

interface HeaderProps {
  location: string;
}

const Header: React.FC<HeaderProps> = ({ location }) => {
  return (
    <View style={styles.header}>
      <View style={styles.button}>
        <GoToSearchCityButton />
      </View>
      <Title style={styles.title}>{location}</Title>
      <View style={styles.button}>
        <GetMyLocationButton />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    alignSelf: "center",
    textAlign: "center",
    marginVertical: "2%",
    width: "70%",
  },
  button: { width: "15%" },
});

export default Header;
