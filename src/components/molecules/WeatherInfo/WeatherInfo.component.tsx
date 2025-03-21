import React from 'react';
import { View, Text } from 'react-native';

import Icon from '../../atoms/Icon/Icon.component';
import { styles } from './WeatherInfo.style';
import { WeatherInfoProps } from './WeatherInfo.types';

const WeatherInfo: React.FC<WeatherInfoProps> = ({ temperature, condition, icon }) => {
  return (
    <View style={styles.container}>
      <Icon source={icon} size={40} />
      <Text style={styles.temperature}>{temperature}</Text>
      <Text style={styles.condition}>{condition}</Text>
    </View>
  );
};

export default WeatherInfo;
