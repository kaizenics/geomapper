import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useAuth } from "@/hooks/useAuth"; 
import FormField from "@/components/Forms/FormField";
import CustomButton from "@/components/Buttons/CustomButton";
import { useRouter } from "expo-router";

const locations = [
  "Davao City",
];

function UserCredentials() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { user } = useAuth(); 

  useEffect(() => {
    if (!user) {
      setErrorMessage("User not authenticated");
      router.push("/log-in");
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!firstName || !lastName || !location) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    try {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          firstName,
          lastName,
          location,
        });
        setErrorMessage("Profile information saved!");
      } else {
        setErrorMessage("User not authenticated");
      }
    } catch (error) {
      console.error("Error writing document: ", error);
      setErrorMessage("Failed to save user information");
    }
  };

  return (
    <View className="flex-1 pt-16 items-center bg-[#0e4483]">
      <FormField
        label="First Name"
        value={firstName}
        placeholder="Enter your first name"
        onChangeText={setFirstName}
      />
   
      <FormField
        label="Last Name"
        value={lastName}
        placeholder="Enter your last name"
        onChangeText={setLastName}
      />
   
      <View className="bg-gray-400 w-5/6 h-[1px] px-4 mb-4"></View>
      <View className="w-full px-4 mb-4">
        <Text className="text-white text-md font-semibold">Available Locations</Text>
        <View className="bg-white border rounded mt-2">
          <Picker
            selectedValue={location}
            onValueChange={(itemValue) => setLocation(itemValue)}
            style={{ height: 50, color: "black" }}
          >
            <Picker.Item label="Select your location" value="" />
            {locations.map((loc) => (
              <Picker.Item key={loc} label={loc} value={loc} />
            ))}
          </Picker>
        </View>
      </View>
      
      <CustomButton title="Submit" onPress={handleSubmit} />
      {errorMessage ? (
        <Text className="text-red-500 text-sm">{errorMessage}</Text>
      ) : null}
    </View>
  );
}

export default UserCredentials;