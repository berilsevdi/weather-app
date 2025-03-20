import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import { styles } from './CustomButton.style';
import { CustomButtonProps } from './CustomButton.types';

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  overrideContainerStyle,
  testId,
}) => {
  return (
    <TouchableOpacity
      testID={testId}
      style={[styles.button, disabled && styles.disabledButton, overrideContainerStyle]}
      onPress={!isLoading ? onPress : undefined} // Yükleme durumunda buton tıklanamaz
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size='small' color='#fff' style={styles.loadingIndicator} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
