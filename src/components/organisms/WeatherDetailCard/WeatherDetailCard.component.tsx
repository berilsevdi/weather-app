import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './WeatherDetailCard.style';

interface WeatherDetailCardProps {
  temperature: number;
  feelsLike: number;
  windSpeed: number;
  humidity: number;
  pressure: number;
}

const WeatherDetailCard: React.FC<WeatherDetailCardProps> = ({
  temperature,
  feelsLike,
  windSpeed,
  humidity,
  pressure,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>🌡️ Temperature: {temperature}°C</Text>
      <Text style={styles.text}>🤔 Feels Like: {feelsLike}°C</Text>
      <Text style={styles.text}>🌬️ Wind Speed: {windSpeed} m/s</Text>
      <Text style={styles.text}>💧 Humidity: %{humidity}</Text>
      <Text style={styles.text}>🔍 Pressure: {pressure} hPa</Text>
    </View>
  );
};

export default WeatherDetailCard;