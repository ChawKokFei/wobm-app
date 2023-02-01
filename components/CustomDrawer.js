import React, {useContext} from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
} from "react-native";

// Context
import {Context} from "../store/context";

// Window size
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const CustomDrawer = props => {
  const {logOut} = useContext(Context);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: "white"}}
      >
        <View style={{flex: 1, backgroundColor: "#fff", paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          borderTopWidth: 1,
          borderBottomColor: "#ccc",
        }}
      />
      <TouchableOpacity
        style={{
          paddingVertical: 15,
          marginTop: 10,
          marginHorizontal: 20,
          marginBottom: 90,
          flexDirection: "row",
          alignItems: "center",
          height: 50,
        }}
        onPress={() => {
          logOut();
        }}
      >
        <Image
          source={require("../assets/icons/log-out-outline.png")}
          resizeMode="contain"
          style={{width: 22, heigth: 22}}
        />
        <Text style={{fontSize: 15, marginLeft: 8, color: "black"}}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomDrawer;
