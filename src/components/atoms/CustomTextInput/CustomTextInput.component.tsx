import React from "react";
import { View, Text, TextInput } from "react-native";
import { CustomTextInputProps } from "./CustomTextInput.types";
import { styles } from "./CustomTextInput.style";

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