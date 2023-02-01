import React from "react";
import {Text, StyleSheet, Dimensions, TouchableOpacity} from "react-native";

// Colors
import Colors from "../constants/colors";

// Window size
const width = Dimensions.get("window").width;

const CustomButton = props => {
  return (
    <TouchableOpacity
      style={[styles.loginButton, props.style]}
      onPress={props.onPress}
    >
      <Text style={[styles.buttonText, props.style]}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    marginVertical: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: Colors.third,
    width: width * 0.4,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  buttonText: {
    fontSize: 24,
    textAlign: "center",
    color: "black",
  },
});

export default CustomButton;
