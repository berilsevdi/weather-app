import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useRoute } from '@react-navigation/native';

import { fetchWeather } from '../../../stores/appSlice';
import { RootState } from '../../../stores/store';
import { styles } from './CityDetailScreen.style';

const CityDetailScreen = () => {
  const route = useRoute();
  const { cityName } = route.params as { cityName: string };
  const dispatch = useDispatch();
  const { searchResult, loading, error } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather(cityName) as any);
  }, [dispatch, cityName]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>"{cityName}" City Details</Text>

      {loading && <ActivityIndicator size='large' color='#007AFF' />}
      {error && <Text style={styles.error}>{error}</Text>}

      {searchResult && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>🌡️ Temperature: {searchResult.temperature}°C</Text>
          <Text style={styles.infoText}>🤔 Feels Like: {searchResult.feelsLike}°C</Text>
          <Text style={styles.infoText}>🌬️ Wind Speed: {searchResult.windSpeed} m/s</Text>
          <Text style={styles.infoText}>💧 Humidity: %{searchResult.humidity}</Text>
          <Text style={styles.infoText}>🔍 Pressure: {searchResult.pressure} hPa</Text>
        </View>
      )}
    </View>
  );
};

export default CityDetailScreen;
