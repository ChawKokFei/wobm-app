import React from "react";
import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

// Colors
import Colors from "../constants/colors";

// Screens
import LandingPageScreen from "../screens/LandingPageScreen";
import HomeScreen from "./HomeScreen";
import IdentifyResultsScreen from "../screens/Identify/IdentifyResultsScreen";

const Stack = createNativeStackNavigator();

const AppNav = props => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#90B77D" />
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          contentStyle: {backgroundColor: Colors.background},
          headerTitleStyle: {fontSize: 24, fontWeight: "normal"},
          headerBackImageSource: require("../assets/icons/chevron-back-outline.png"),
        }}
      >
        <Stack.Screen
          name="Landing"
          component={LandingPageScreen}
          options={{
            title: "Landing Page",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="IdentifyResult"
          component={IdentifyResultsScreen}
          options={{title: "Results"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;
