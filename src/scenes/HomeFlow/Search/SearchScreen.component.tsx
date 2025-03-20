import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import WeatherCard from '../../../components/organisms/WeatherCard/WeatherCard.component';
import { fetchWeather } from '../../../stores/appSlice';
import { RootState } from '../../../stores/store';
import { styles } from './SearchScreen.style';

const SearchScreen = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const { searchResult, loading, error } = useSelector((state: RootState) => state.weather);

  const handleSearch = () => {
    if (search.trim()) {
      dispatch(fetchWeather(search.trim()) as any);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Şehir ara...'
          placeholderTextColor='white'
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Ara</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size='large' color='#007AFF' style={styles.loading} />}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {searchResult && (
        <WeatherCard
          city={searchResult.city}
          temperature={`${searchResult.temperature}°C`}
          condition={searchResult.description}
          icon={searchResult.icon}
        />
      )}
    </View>
  );
};

export default SearchScreen;
