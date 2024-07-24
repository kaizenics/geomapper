import React from 'react';
import { View, TextInput, Text } from 'react-native';

interface FormFieldProps {
  label: string;
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, placeholder, secureTextEntry, onChangeText }) => {
  return (
    <View className="mb-4 w-full px-4">
      <Text className="text-white text-md font-semibold mb-1">{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#ddd"
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        className="bg-white text-black rounded-lg py-3 px-4"
      />
    </View>
  );
};

export default FormField;