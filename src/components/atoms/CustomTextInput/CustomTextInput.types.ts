import { TextInputProps, ViewStyle } from "react-native";

type CustomTextInputProps = TextInputProps & {
  label?: string;
  errorMessage?: string;
  overrideContainerStyle?: ViewStyle;
  testId?: string;
};

export type { CustomTextInputProps };