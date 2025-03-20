import React from 'react';
import { View, Text, TextInput } from 'react-native';

import { styles } from './CustomTextInput.style';
import { CustomTextInputProps } from './CustomTextInput.types';

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  errorMessage,
  overrideContainerStyle,
  testId,
  ...props
}) => {
  return (
    <View style={[styles.container, overrideContainerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.input} testID={testId} {...props} />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default CustomTextInput;
