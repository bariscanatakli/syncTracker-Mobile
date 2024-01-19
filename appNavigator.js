import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen"; // Import your Home screen component
import QRScannerScreen from "./screens/QRScannerScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ClassesScreen from "./screens/ClassesScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Login"
          component={isLoggedIn ? HomeScreen : LoginScreen}
        />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen
          name="Home"
          component={isLoggedIn ? HomeScreen : LoginScreen}
        />
        <Stack.Screen
          name="QRScanner"
          component={isLoggedIn ? QRScannerScreen : LoginScreen}
        />
        <Stack.Screen
          name="Profile"
          component={isLoggedIn ? ProfileScreen : LoginScreen}
        />
        <Stack.Screen
          name="Classes"
          component={isLoggedIn ? ClassesScreen : LoginScreen}
        />
  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
