import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { HeaderProps } from "./Header.types";
import { styles } from "./Header.style";
import Icon from "../../atoms/Icon/Icon.component";

const Header: React.FC<HeaderProps> = ({ title, onBackPress }) => {
  return (
    <View style={styles.container}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress}>
          <Icon source={require("../../../../assets/back.png")} size={24} tintColor="#fff" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;