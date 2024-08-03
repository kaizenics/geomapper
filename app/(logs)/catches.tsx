import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";

const Catches = () => {
  return (
    <>
      <SafeAreaView className="bg-white flex-1">
        <ScrollView contentContainerStyle={{ paddingHorizontal: 1, paddingVertical: 8  }}>
          <View className="mt-10">
            <Text>Catches</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Catches;
