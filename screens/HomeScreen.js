import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated"; // Import your animations library if needed
import { logoutUser } from "../redux/users/userActions";
import { useDispatch } from "react-redux"; // Import useDispatch

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Get the dispatch function

  return (
    <View className="bg-white h-full w-full">
      <StatusBar style="light" />
      <Image
        className="h-full w-full absolute"
        source={require("../assets/images/background.png")}
      />

      {/* lights or any other decorative elements */}
      {/* ... */}

      {/* Content */}
      <View className="h-full w-full flex justify-around pt-40 pb-10">
        {/* Title */}
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInDown.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl"
          >
            Welcome!
          </Animated.Text>
        </View>

        {/* Action Button */}
        <View className="flex items-center mx-5 space-y-4">
          <Animated.View
            entering={FadeIn.duration(1000).springify()}
            className="w-full"
          >
            <TouchableOpacity
              onPress={() => navigation.push("Profile")}
              className="w-full bg-sky-700 p-3 rounded-2xl mt-4"
            >
              <Text className="text-xl font-bold text-white text-center">
                Profile
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View className="flex items-center mx-5 space-y-4">
          <Animated.View
            entering={FadeIn.duration(1000).springify()}
            className="w-full"
          >
            <TouchableOpacity
              onPress={() => navigation.push("Classes")}
              className="w-full bg-sky-800 p-3 rounded-2xl mb-3"
            >
              <Text className="text-xl font-bold text-white text-center">
                Classes
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        {/* Action Button */}
        <View className="flex items-center mx-5 space-y-4">
          <Animated.View
            entering={FadeIn.duration(1000).springify()}
            className="w-full"
          >
            <TouchableOpacity
              onPress={() => dispatch(logoutUser())}
              className="w-full bg-sky-900 p-3 rounded-2xl mb-3"
            >
              <Text className="text-xl font-bold text-white text-center">
                Log Out
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Other content or navigational elements */}
        {/* ... */}
      </View>
    </View>
  );
}
