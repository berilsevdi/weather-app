import { ViewStyle } from "react-native";

type SearchBarProps = {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSearchPress?: () => void;
  overrideContainerStyle?: ViewStyle;
};

export type { SearchBarProps };