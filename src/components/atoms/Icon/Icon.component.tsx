import React from "react";
import { Image } from "react-native";
import { IconProps } from "./Icon.types";
import { styles } from "./Icon.style";

const Icon: React.FC<IconProps> = ({ source, size = 24, tintColor }) => {
  return <Image source={source} style={[styles.icon, { width: size, height: size, tintColor }]} />;
};

export default Icon;