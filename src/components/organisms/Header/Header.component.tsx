import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Icon from '../../atoms/Icon/Icon.component';
import { styles } from './Header.style';
import { HeaderProps } from './Header.types';

const Header: React.FC<HeaderProps> = ({ title, onBackPress }) => {
  return (
    <View style={styles.container}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress}>
          <Icon source={require('../../../../assets/back.png')} size={24} tintColor='#fff' />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;
