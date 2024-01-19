import * as React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated"; // Import your animations library if needed
import { logoutUser } from "../redux/users/userActions";
import { useDispatch } from "react-redux"; // Import useDispatch
import axios from "axios";
import { useState, useEffect } from "react";

export default function ClassesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Get the dispatch function
  const [classes, setClasses] = useState([]);

  const getClasses = async () => {
    try {
      const response = await axios.get("http://192.168.4.164:3000/menu", {
        params: {
          mobile: true,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log(response.data.classList);
      setClasses(response.data.classList); // Assuming your response contains the class data
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  useEffect(() => {
    getClasses();
  }, []);

  const renderClassButton = (classItem) => (
    <Animated.View
      entering={FadeIn.duration(1000).springify()}
      className="w-full"
      key={classItem._id} // Assuming _id is unique
    >
      <TouchableOpacity
        onPress={() => navigation.push("QRScanner")}
        className="w-full bg-sky-700 p-3 rounded-2xl mt-4"
      >
        <Text className="text-xl font-bold text-white text-center">
          {classItem.className}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

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
            Classes
          </Animated.Text>
        </View>

        {/* Action Button */}
        <ScrollView
          contentContainerStyle={{ alignItems: "center" }}
          style={{ flex: 1, marginHorizontal: 5 }}
        >
          {classes.map((classItem) => renderClassButton(classItem))}
        </ScrollView>
      </View>
    </View>
  );
}
