import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
// import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux"; // Import useDispatch
import { loginUser } from "../redux/users/userActions"; // Import your action creator
import { useSelector } from "react-redux";

export default function ChangePasswordScreen() {
  const dispatch = useDispatch(); // Get the dispatch function
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

        <View className="flex items-center mx-5">
          <View className="flex items-center">
            <Animated.Text
              entering={FadeInUp.duration(1000).springify()}
              className="text-black font-bold tracking-wider text-3xl"
            >
              Change Password
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
                  placeholder="Old Password"
                  placeholderTextColor={"gray"}
                />
              </Animated.View>
            )}
            name="oldPassword"
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
                  placeholder="New Password"
                  placeholderTextColor={"gray"}
                  secureTextEntry
                />
              </Animated.View>
            )}
            name="newPassword"
          />
          {errors.oldPassword && <Text>{errors.oldPassword.message}</Text>}
          {errors.newPassword && <Text>{errors.newPassword.message}</Text>}
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
                Change the password
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
