import { View, Text, Image} from "react-native";
import { Tabs, Redirect } from "expo-router";

import { icons } from "../constants";

const TabIcon = ({ icon, color, name, focused }: { icon: any, color: string, name: string, focused: boolean }) => {
  return (
    <View>
      <Image
       source={icon}
       resizeMode="contain"
       tintColor={color}
       className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
}

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="home" options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
               icon={icons.home}
               color={color}
               name="Home"
               focused={focused}
              />
                ),
        }} />
         
      </Tabs>
    </>
  );
};
export default TabsLayout;
