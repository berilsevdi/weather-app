import React from 'react';
import { View } from 'react-native';

import { styles } from './Divider.style';
import { DividerProps } from './Divider.types';

const Divider: React.FC<DividerProps> = ({ color = '#DDD', thickness = 1, marginVertical = 8 }) => {
  return (
    <View style={[styles.divider, { height: thickness, backgroundColor: color, marginVertical }]} />
  );
};

export default Divider;
