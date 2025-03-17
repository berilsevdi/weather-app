import { ImageSourcePropType } from "react-native";

type WeatherCardProps = {
  city: string;
  temperature: string;
  condition: string;
  icon?: string; 
};

export type { WeatherCardProps };