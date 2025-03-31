import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../stores/store';
import {
  fetchLocationForecast,
  setCityInfo,
  fetchCurrentWeather,
} from '../../../stores/appSlice';
import * as Location from 'expo-location';
import ForecastCard from '../../../components/organisms/ForecastCard/ForecastCard.component';
import WeatherDetailCard from '../../../components/organisms/WeatherDetailCard/WeatherDetailCard.component';
import CityInfoSection from '../../../components/organisms/CityInfoSection/CityInfoSection.component';
import { ForecastData } from '../../../stores/appSlice';
import { styles } from './HomeScreen.style';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { currentLocationForecast, cityInfo, currentWeather, loading, error } = useSelector(
    (state: RootState) => state.weather
  );
  const [locationLoading, setLocationLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocationLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        dispatch(fetchLocationForecast({ lat: latitude, lon: longitude }) as any);
        dispatch(fetchCurrentWeather({ lat: latitude, lon: longitude }) as any);

        const [reverseGeoData] = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (reverseGeoData) {
          const cityName = reverseGeoData.region || '';

          dispatch(
            setCityInfo({
              name: cityName,
              country: reverseGeoData.country || '',
              population: 0,
              region: '',
              timezone: reverseGeoData.timezone || '',
            })
          );
        }
      } catch (err) {
        console.error('Konum verisi alınamadı:', err);
      } finally {
        setLocationLoading(false);
      }
    })();
  }, [dispatch]);

  const memoizedForecast = useMemo(() => currentLocationForecast, [currentLocationForecast]);

  const renderItem = useCallback(
    ({ item }: { item: ForecastData }) => <ForecastCard forecast={item} />,
    []
  );

  return (
    <View style={styles.container}>
      {loading || locationLoading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          {cityInfo?.name && <Text style={styles.cityTitle}>{cityInfo.name}</Text>}

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

export default HomeScreen;