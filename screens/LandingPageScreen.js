import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useRef, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions, Animated } from "react-native";
import Colors from "../constants/colors";
import { CommonActions } from "@react-navigation/native";

const LandingPageScreen = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const navigator = useNavigation();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      const reset = CommonActions.reset({
        index: 1,
        routes: [{ name: "Home" }],
      });
      navigator.dispatch(reset);
    });
  }, [animation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: animation }}>
        <Image
          source={require("../assets/icon.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </Animated.View>
    </View>
  );
};

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fifth,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.7,
  },
});

export default LandingPageScreen;
