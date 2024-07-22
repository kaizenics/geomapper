import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ViewStyle } from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  buttonStyle?: ViewStyle;
  textStyle?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, buttonStyle, textStyle, ...props }) => {
  return (
    <TouchableOpacity
      className="bg-transparent  rounded-lg py-3 px-6"
    >
      <Text className="text-black text-2xl">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
