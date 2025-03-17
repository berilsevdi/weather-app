import React, { useState } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { fetchWeather } from "../../../stores/appSlice";
import { styles } from "./SearchScreen.style"; 

const SearchScreen = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { searchResult, loading, error } = useSelector((state: RootState) => state.weather);
  const handleSearch = () => {
    if (search.trim()) {
      dispatch(fetchWeather(search.trim()) as any);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Şehir ara..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
      <Button title="Ara" onPress={handleSearch} />
      {loading && <Text style={styles.loading}>Yükleniyor...</Text>}

    {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}

{searchResult && (
  <View style={styles.resultContainer}>
    <Text style={styles.city}>{searchResult.city}</Text>
    <Text style={styles.temp}>{searchResult.temperature}°C</Text>
    <Text>{searchResult.description}</Text>
  </View>
)}
    </View>
  );
};

export default SearchScreen;