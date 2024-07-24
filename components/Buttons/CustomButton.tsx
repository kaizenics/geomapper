import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { ViewStyle } from "react-native";

interface LoginButtonProps extends TouchableOpacityProps {
  title: string;
  buttonStyle?: ViewStyle;
  textStyle?: ViewStyle;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  title,
  buttonStyle,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity {...props} className="bg-[#0e4483] rounded-full py-3 px-36 mb-2">
      <View className="flex-row items-center space-x-3">
        <Text className="text-white text-lg font-semibold">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LoginButton;
