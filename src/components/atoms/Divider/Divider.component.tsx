import React from "react";
import { View } from "react-native";
import { DividerProps } from "./Divider.types";
import { styles } from "./Divider.style";

const Divider: React.FC<DividerProps> = ({ color = "#DDD", thickness = 1, marginVertical = 8 }) => {
  return <View style={[styles.divider, { height: thickness, backgroundColor: color, marginVertical }]} />;
};

export default Divider;