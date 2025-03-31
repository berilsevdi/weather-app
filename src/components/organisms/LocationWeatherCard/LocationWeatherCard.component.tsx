import React from 'react';
import { View, Text, Image } from 'react-native';

import { WeatherData } from '../../../stores/appSlice';
import { styles } from './LocationWeatherCard.style';

interface Props {
  weather: WeatherData;
}

const LocationWeatherCard: React.FC<Props> = ({ weather }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.city}>{weather.city}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png` }}
        style={styles.icon}
      />
      <Text style={styles.temperature}>{`${weather.temperature}°C`}</Text>
      <Text style={styles.condition}>{weather.description}</Text>
    </View>
  );
};

export default LocationWeatherCard;
