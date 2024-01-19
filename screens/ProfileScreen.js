import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch
import { loginUser } from "../redux/users/userActions"; // Import your action creator
import axios from "axios";
import { Feather } from "@expo/vector-icons";

import Modal from "react-native-modal";

export default function ProfileScreen() {
  const [isModalVisibleName, setIsModalVisibleName] = useState(false);
  const [isModalVisibleSNumber, setIsModalVisibleSNumber] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleSave = () => {
    // Handle saving the input value here
    console.log("Saved value:", inputValue);
  };

  const handleCloseName = () => {
    // Handle closing the modal here
    setIsModalVisibleName(false); // Assuming you have a state variable to control visibility
  };
  const handleCloseSNumber = () => {
    // Handle closing the modal here
    setIsModalVisibleSNumber(false); // Assuming you have a state variable to control visibility
  };

  const dispatch = useDispatch(); // Get the dispatch function
  const userData = useSelector((s) => s.user.userData);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onPressSend = async (formData) => {
    // Manual validation
    let valid = true;
    let errorMessage = "";
    if (!formData.email) {
      valid = false;
      errorMessage = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      valid = false;
      errorMessage = "Invalid email format";
    }

    if (!formData.password) {
      valid = false;
      errorMessage = "Password is required";
    } else if (formData.password.length < 7) {
      valid = false;
      errorMessage = "Password must contain at least 7 characters";
    }

    if (!valid) {
      setError(errorMessage);
      return;
    }
    try {
      const response = await axios.post(
        "http://192.168.4.164:3000/mobile/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200 && response.data.loggedIn) {
        const userData = {
          email: response.data.email /* other user data if needed */,
        };
        dispatch(loginUser(userData));
        navigation.navigate("Home");
      } else {
        setError("Invalid email or password"); // Set error state for wrong credentials
      }
    } catch (error) {
      if (error.response) {
        // Request was made and the server responded with a status code
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log("Error:", error.message);
      }
      setError("Network Error: Please check your connection"); // Set appropriate error message
    }
  };
  const navigation = useNavigation();

  return (
    <View className="bg-white h-full w-full">
      <Modal isVisible={isModalVisibleName}>
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseName}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.modalView}>
          <View className="flex items-center">
            <Animated.Text
              entering={FadeInUp.duration(1000).springify()}
              className="text-black font-bold tracking-wider text-3xl"
            >
              Name
            </Animated.Text>
          </View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 mt-5 p-5 rounded-2xl w-full"
          >
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Enter value here"
            />
          </Animated.View>
          
          <Animated.View
            className="w-full"
            entering={FadeInDown.delay(600).duration(1000).springify()}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleSubmit(onPressSend)}
              className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
            >
              <Text className="text-xl font-bold text-white text-center">
                Save
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
      <Modal isVisible={isModalVisibleSNumber}>
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseSNumber}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.modalView}>
          <View className="flex items-center">
            <Animated.Text
              entering={FadeInUp.duration(1000).springify()}
              className="text-black font-bold tracking-wider text-3xl"
            >
              Student Number
            </Animated.Text>
          </View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 mt-5 p-5 rounded-2xl w-full"
          >
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Enter value here"
            />
          </Animated.View>
          
          <Animated.View
            className="w-full"
            entering={FadeInDown.delay(600).duration(1000).springify()}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleSubmit(onPressSend)}
              className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
            >
              <Text className="text-xl font-bold text-white text-center">
                Save
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
      <StatusBar style="light" />

      {/* lights */}
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          source={require("../assets/images/light.png")}
          className="h-[225] w-[90]"
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          source={require("../assets/images/light.png")}
          className="h-[160] w-[65] opacity-75"
        />
      </View>

      {/* title and form */}
      <View className="h-full w-full flex justify-around">
        {/* title */}
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-black font-bold tracking-wider text-5xl mb-15"
          >
            Profile
          </Animated.Text>
        </View>
        {/* form */}
        <View className="flex items-left mx-5 space-y-">
          <View className="flex flex-row">
            <Animated.Text className="text-black basis-4/5 font-bold tracking-wider text-l mb-20">
              Email : {userData.email}
            </Animated.Text>
            <TouchableOpacity
              activeOpacity={0.7}
              // onPress={() => setIsModalVisibleName(true)}
              className="basis-1/5"
            >
              <Feather name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row">
            <Animated.Text className="text-black text-black basis-4/5 font-bold tracking-wider text-l mb-20">
              Name : Barış Can Ataklı
            </Animated.Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsModalVisibleName(true)}
              className="text-black basis-1/5"
            >
              <Feather name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row">
            <Animated.Text className="text-black text-black basis-4/5 font-bold tracking-wider text-l mb-20">
              Student Number : 210717014
            </Animated.Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsModalVisibleSNumber(true)}
              className="text-black basis-1/5"
            >
              <Feather name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modalView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    position: "relative", // Added to make positioning absolute relative to this container
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  card: {
    width: "100%",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#BDBDBD",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    width: "100%",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 2,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#2196F3",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    width: 24, // Adjust width as needed
    height: 24, // Adjust height as needed
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12, // Make it a circle by setting borderRadius to half of the width and height
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional background color
  },
});
