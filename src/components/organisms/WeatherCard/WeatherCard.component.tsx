import React from 'react';
import { View, Text, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../../navigations/AppNavigator';
import { styles } from './WeatherCard.style';
import { WeatherCardProps } from './WeatherCard.types';

// ✅ Navigation tipi import edildi.

const getWeatherIcon = (iconCode?: string): ImageSourcePropType => {
  return iconCode
    ? { uri: `https://openweathermap.org/img/wn/${iconCode}@2x.png` }
    : require('../../../../assets/sun.png');
};

// ✅ **Navigation tipi ekleyerek hatayı düzeltiyoruz**
type NavigationProp = StackNavigationProp<RootStackParamList, 'City Detail'>;

const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, condition, icon }) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('City Detail', { cityName: city });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Text style={styles.city}>{city}</Text>
      <Image source={getWeatherIcon(icon)} style={styles.icon} />
      <Text style={styles.temperature}>{`${temperature}°C`}</Text>
      <Text style={styles.condition}>{condition}</Text>
    </TouchableOpacity>
  );
};

export default WeatherCard;
