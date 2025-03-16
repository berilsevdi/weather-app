import React from "react";
import { View, Text } from "react-native";
import { WeatherCardProps } from "./WeatherCard.types";
import { styles } from "./WeatherCard.style";
import WeatherInfo from "../../molecules/WeatherInfo/WeatherInfo.component";

const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, condition, icon }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.city}>{city}</Text>
      <WeatherInfo temperature={temperature} condition={condition} icon={icon} />
    </View>
  );
};

export default WeatherCard;