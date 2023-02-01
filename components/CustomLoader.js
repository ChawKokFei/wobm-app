import React from "react";
import {View, ActivityIndicator, Text} from "react-native";

const CustomLoader = ({style, children}) => {
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      <Text
        style={{lineHeight: 30, fontSize: 24, marginBottom: 4, color: "black"}}
      >
        {children}
      </Text>
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default CustomLoader;
