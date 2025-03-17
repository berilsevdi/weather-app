import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../stores/store";
import { fetchWeatherList, fetchWeather } from "../../../stores/appSlice";
import Header from "../../../components/organisms/Header/Header.component";
import SearchBar from "../../../components/molecules/SearchBar/SearchBar.component";
import WeatherCard from "../../../components/organisms/WeatherCard/WeatherCard.component";
import { styles } from "./HomeScreen.style";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const { weatherList, searchResult, loading } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(fetchWeatherList() as any);
  }, []);
  
  const weatherData = useSelector((state: RootState) => state.weather);

  const handleSearch = () => {
    if (searchText.trim()) {
      dispatch(fetchWeather(searchText.trim()) as any);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={weatherList}
          keyExtractor={(item) => item.city}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}  // 👈 Tab Bar için boşluk eklendi
          renderItem={({ item }) => (
            <WeatherCard 
              city={item.city} 
              temperature={`${item.temperature}`}
              condition={item.description} 
              icon={item.icon} 
            />
          )}
        />
      )}
    </View>
  );
};

export default HomeScreen;