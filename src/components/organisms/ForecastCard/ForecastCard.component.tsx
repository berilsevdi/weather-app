import React from 'react';
import { View, Text, Image } from 'react-native';

import { ForecastData } from '../../../stores/appSlice';
import { styles } from './ForecastCard.style';

interface Props {
  forecast: ForecastData;
}

const ForecastCard: React.FC<Props> = ({ forecast }) => {
  const formattedDate = forecast.date.split(' ')[0]; // sadece tarih

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{formattedDate}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${forecast.icon}@2x.png` }}
        style={styles.icon}
      />
      <Text style={styles.temp}>{forecast.temperature.toFixed(1)}°C</Text>
      <Text style={styles.desc}>{forecast.description}</Text>
    </View>
  );
};

export default ForecastCard;
