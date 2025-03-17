import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { WeatherCardProps } from "./WeatherCard.types";
import { styles } from "./WeatherCard.style";

const getWeatherIcon = (iconCode?: string): ImageSourcePropType => {
  return iconCode
    ? { uri: `https://openweathermap.org/img/wn/${iconCode}@2x.png` }
    : require("../../../../assets/sun.png");
};

const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, condition, icon }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.city}>{city}</Text>
      <Image source={getWeatherIcon(icon)} style={styles.icon} />
      <Text style={styles.temperature}>{`${temperature}°C`}</Text>  
      <Text style={styles.condition}>{condition}</Text>
    </View>
  );
};

export default WeatherCard;