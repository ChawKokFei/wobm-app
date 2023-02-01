import React from "react";
import {View, Image, StyleSheet, Dimensions, Text} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

// Colors
import Colors from "../constants/colors";

// Screens
import IdentifyScreen from "../screens/Identify/IdentifyScreen";

// Window size
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenContainerStyle={{backgroundColor: "white"}}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          height: 65,
          backgroundColor: Colors.third,
        },
      }}
    >
      <Tab.Screen
        name="Identify"
        component={IdentifyScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.iconContainer,
                {
                  top: -20,
                  borderRadius: (width * 0.18) / 2,
                  height: width * 0.18,
                },
                {backgroundColor: focused ? Colors.background : "white"},
                !focused && styles.shadow,
              ]}
            >
              <Image
                source={require("../assets/icons/camera-outline.png")}
                resizeMode="contain"
                style={{width: 33, height: 33}}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    width: width * 0.18,
    borderRadius: 16,
  },
  icon: {
    width: 29,
    height: 29,
  },
  shadow: {
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  text: {
    fontSize: 12,
    color: "black",
  },
});

export default HomeScreen;
