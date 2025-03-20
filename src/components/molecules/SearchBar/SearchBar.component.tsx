import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';

import Icon from '../../atoms/Icon/Icon.component';
import { styles } from './SearchBar.style';
import { SearchBarProps } from './SearchBar.types';

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Şehir ara...',
  value,
  onChangeText,
  onSearchPress,
  overrideContainerStyle,
}) => {
  return (
    <View style={[styles.container, overrideContainerStyle]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={onSearchPress} style={styles.icon}>
        <Icon source={require('../../../../assets/search.png')} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
