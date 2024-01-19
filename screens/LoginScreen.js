import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux"; // Import useDispatch
import { loginUser } from "../redux/users/userActions"; // Import your action creator
import axios from "axios";

export default function SignupScreen() {
  const dispatch = useDispatch(); // Get the dispatch function

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      <View className="h-full w-full flex justify-around pt-48">
        {/* title */}

        {/* form */}
        <View className="flex items-center mx-5 space-y-4">
          <View className="flex items-center">
            <Animated.Text
              entering={FadeInUp.duration(1000).springify()}
              className="text-black font-bold tracking-wider text-5xl mb-15"
            >
              Login
            </Animated.Text>
          </View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                className="bg-black/5 mt-5 p-5 rounded-2xl w-full"
              >
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Email"
                  placeholderTextColor={"gray"}
                />
              </Animated.View>
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                className="bg-black/5 mt-5 p-5 rounded-2xl w-full mb-3"
              >
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Password"
                  placeholderTextColor={"gray"}
                  secureTextEntry
                />
              </Animated.View>
            )}
            name="password"
          />
          {error && <Text>{error}</Text>}
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
                Login
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(800).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <Text>Do not have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push("Register")}>
              <Text className="text-sky-600">Register</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
