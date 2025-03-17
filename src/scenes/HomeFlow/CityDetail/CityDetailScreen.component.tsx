import React from "react";
import { View, Text } from "react-native";

const CityDetailScreen = ({ route }) => {
  const { city } = route.params;

  return (
    <View>
      <Text>Şehir: {city}</Text>
    </View>
  );
};

export default CityDetailScreen;