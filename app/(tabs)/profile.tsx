import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileButton from "@/components/Buttons/ProfileButton";
import AddButton from "@/components/Buttons/AddButton";
import icons from "@/constants/icons";
import { useRouter } from "expo-router";
import { auth } from "@/config/firebaseConfig";
import { getFirestore, doc, getDoc, DocumentData } from "firebase/firestore";
import { User } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [emailInitial, setEmailInitial] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchUserData = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);

      // Fetch additional user data from Firestore
      const userDoc = doc(getFirestore(), "users", currentUser.uid);
      const docSnap = await getDoc(userDoc);

      const email = currentUser.email || "";
      const initial = email.split("@")[0];
      setEmailInitial(`@${initial}`);

      if (docSnap.exists()) {
        const data = docSnap.data() as DocumentData;
        setFirstName(data?.firstName || "");
        setLastName(data?.lastName || "");

        // Fetch profile picture from Firebase Storage
        const storage = getStorage();
        const profilePicRef = ref(
          storage,
          `profile_pictures/${currentUser.uid}`
        );
        try {
          const url = await getDownloadURL(profilePicRef);
          setProfilePicture(url);
        } catch (error) {
          console.log("No profile picture found");
        }
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex items-center">
          <View className="w-28 h-28 rounded-full bg-gray-300 flex justify-center items-center">
            {profilePicture ? (
              <Image
                source={{ uri: profilePicture }}
                className="w-28 h-28 rounded-full"
                resizeMode="cover"
              />
            ) : (
              <Image
                source={icons.user}
                className="w-14 h-14"
                resizeMode="contain"
                style={{ tintColor: "#9ca3af" }}
              />
            )}
          </View>
          <Text className="text-lg mt-3 -mb-1 font-psemibold">
            {firstName} {lastName}
          </Text>
          <View className="flex items-center space-y-2">
            <Text className="text-md text-black font-pregular">
              {emailInitial}
            </Text>
          </View>
          <View className="flex flex-row items-center space-x-2 mt-2">
            <ProfileButton
              title="Edit profile"
              onPress={() => router.push("/edit-profile")}
            />
            <ProfileButton
              title="Settings"
              onPress={() => router.push("/user-settings")}
            />
          </View>
        </View>
        <View className="flex flex-row justify-between items-left space-x-2 mt-1">
          <View className="mt-1 flex-row space-x-1.5">
            <Text className="text-black text-lg font-psemibold">Catches</Text>
          </View>
          <AddButton onPress={() => router.push("/navigate-location")} />
        </View>

        <View className="flex flex-row items-center space-x-3 mt-2">
          <View className="w-24 h-24 rounded-md bg-gray-200 flex justify-center items-center">
            <Image
              source={icons.fish}
              className="w-12 h-12"
              resizeMode="contain"
            />
          </View>
          <View className="flex-1 mb-4">
            <Text className="text-black text-lg font-psemibold">
              Start your logbook
            </Text>
            <Text className="text-gray-500 text-sm font-pregular leading-4">
              Track all your catches in one place! Find and relive your fishing
              memories whenever you'd like.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
