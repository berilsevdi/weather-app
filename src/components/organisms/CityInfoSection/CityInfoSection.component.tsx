import React from 'react';
import { View, Text } from 'react-native';

import Icon from '../../atoms/Icon/Icon.component';
import { styles } from './CityInfoSection.style';
import { CityInfoSectionProps } from './CityInfoSection.types';

const CityInfoSection: React.FC<CityInfoSectionProps> = ({
  cityName,
  country,
  population,
  timezone,
  flagIcon,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Şehir:</Text>
        <Text style={styles.value}>{cityName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Ülke:</Text>
        <Text style={styles.value}>{country}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Nüfus:</Text>
        <Text style={styles.value}>{population}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Saat Dilimi:</Text>
        <Text style={styles.value}>{timezone}</Text>
      </View>
      {flagIcon && <Icon source={flagIcon} size={40} />}
    </View>
  );
};

export default CityInfoSection;
