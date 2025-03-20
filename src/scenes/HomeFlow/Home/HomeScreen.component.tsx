import React, { useEffect, useMemo, useCallback } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import WeatherCard from '../../../components/organisms/WeatherCard/WeatherCard.component';
import { fetchWeatherList } from '../../../stores/appSlice';
import { RootState } from '../../../stores/store';
import { styles } from './HomeScreen.style';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { weatherList, loading } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(fetchWeatherList() as any);
  }, [dispatch]);

  const memoizedWeatherList = useMemo(() => weatherList, [weatherList]);

  const renderItem = useCallback(
    ({ item }) => (
      <WeatherCard
        city={item.city}
        temperature={`${item.temperature}°C`}
        condition={item.description}
        icon={item.icon}
      />
    ),
    []
  );

  return (
    <View style={styles.overlay}>
      {loading ? (
        <ActivityIndicator size='large' color='#fff' />
      ) : (
        <FlatList
          data={memoizedWeatherList}
          keyExtractor={item => item.city}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default HomeScreen;
