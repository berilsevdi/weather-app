import { ImageSourcePropType } from "react-native";

type WeatherCardProps = {
  city: string;
  temperature: string;
  condition: string;
  icon: ImageSourcePropType;
};

export type { WeatherCardProps };