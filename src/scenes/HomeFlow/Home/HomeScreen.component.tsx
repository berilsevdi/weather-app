import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import Header from "../../../components/organisms/Header/Header.component";
import SearchBar from "../../../components/molecules/SearchBar/SearchBar.component";
import WeatherCard from "../../../components/organisms/WeatherCard/WeatherCard.component";
import CityInfoSection from "../../../components/organisms/CityInfoSection/CityInfoSection.component";
import { styles } from "./HomeScreen.style";

const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");

  // Mock veri
  const cityData = {
    city: "İstanbul",
    country: "Türkiye",
    population: "15M",
    timezone: "GMT+3",
    temperature: "18°C",
    condition: "Güneşli",
    icon: require("../../../../assets/sun.png"),
  };

  return (
    <View style={styles.container}>
      <Header title="Hava Durumu" />
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onSearchPress={() => console.log("Arama yap:", searchText)}
      />
      <ScrollView>
        <WeatherCard city={cityData.city} temperature={cityData.temperature} condition={cityData.condition} icon={cityData.icon} />
        <CityInfoSection cityName={cityData.city} country={cityData.country} population={cityData.population} timezone={cityData.timezone} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;