import React, { useEffect, useMemo, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';

import {
  fetchWeather,
  fetchLocationForecast,
  setCityInfo,
  fetchCurrentWeather,
} from '../../../stores/appSlice';
import { RootState } from '../../../stores/store';
import ForecastCard from '../../../components/organisms/ForecastCard/ForecastCard.component';
import WeatherDetailCard from '../../../components/organisms/WeatherDetailCard/WeatherDetailCard.component';
import CityInfoSection from '../../../components/organisms/CityInfoSection/CityInfoSection.component';
import * as Location from 'expo-location';
import { ForecastData } from '../../../stores/appSlice';
import { styles } from './CityDetailScreen.style';

const CityDetailScreen = () => {
  const route = useRoute();
  const { cityName } = route.params as { cityName: string };
  const dispatch = useDispatch();
  const { searchResult, currentLocationForecast, cityInfo, loading, error, currentWeather } =
    useSelector((state: RootState) => state.weather);

  useEffect(() => {
    (async () => {
      try {
        dispatch(fetchWeather(cityName) as any);

        const location = await Location.geocodeAsync(cityName);
        if (location.length > 0) {
          const { latitude, longitude } = location[0];
          dispatch(fetchLocationForecast({ lat: latitude, lon: longitude }) as any);
          dispatch(fetchCurrentWeather({ lat: latitude, lon: longitude }) as any);

          const [reverseGeoData] = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });

          if (reverseGeoData) {
            const cityRealName = reverseGeoData.region || '';

            dispatch(
              setCityInfo({
                name: cityRealName,
                country: reverseGeoData.country || '',
                population: 0,
                region: '',
                timezone: reverseGeoData.timezone || '',
              })
            );
          }
        }
      } catch (err) {
        console.error('Şehir detay ekranı konum hatası:', err);
      }
    })();
  }, [dispatch, cityName]);

  const memoizedForecast = useMemo(() => currentLocationForecast, [currentLocationForecast]);

  const renderItem = useCallback(
    ({ item }: { item: ForecastData }) => <ForecastCard forecast={item} />,
    []
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          {cityInfo?.name && <Text style={styles.title}>{cityInfo.name}</Text>}

          <FlatList
            data={memoizedForecast}
            keyExtractor={(item) => item.date}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.forecastList}
          />

          {currentWeather && (
            <WeatherDetailCard
              temperature={currentWeather.temperature}
              feelsLike={currentWeather.feelsLike}
              windSpeed={currentWeather.windSpeed}
              humidity={currentWeather.humidity}
              pressure={currentWeather.pressure}
            />
          )}

          {cityInfo && (
            <CityInfoSection
              cityName={cityInfo.name}
              country={cityInfo.country}
              timezone={cityInfo.timezone}
            />
          )}
        </>
      )}
    </View>
  );
};

export default CityDetailScreen;