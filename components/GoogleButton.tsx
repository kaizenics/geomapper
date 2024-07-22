import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { ViewStyle } from "react-native";
import { AntDesign } from '@expo/vector-icons';

interface GoogleButtonProps extends TouchableOpacityProps {
  title: string;
  buttonStyle?: ViewStyle;
  textStyle?: ViewStyle;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({
  title,
  buttonStyle,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity className="bg-white rounded-full py-3 px-16 mb-2">
      <View className="flex-row items-center space-x-3">
        <AntDesign name="google" size={24} color="#167cfa" />
        <Text className="text-[#167cfa] text-lg font-semibold">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoogleButton;
