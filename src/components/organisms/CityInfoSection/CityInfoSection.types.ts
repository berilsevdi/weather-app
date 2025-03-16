import { ImageSourcePropType } from "react-native";

type CityInfoSectionProps = {
  cityName: string;
  country: string;
  population: string;
  timezone: string;
  flagIcon?: ImageSourcePropType;
};

export type { CityInfoSectionProps };