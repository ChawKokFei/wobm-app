import React, {useEffect, useContext} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import {
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import Tflite from "tflite-react-native";
import {requestForegroundPermissionsAsync} from "expo-location";

// Colors
import Colors from "../../constants/colors";
import {useNavigation} from "@react-navigation/native";

// Context
import {Context} from "../../store/context";

const IdentifyScreen = () => {
  const navigator = useNavigation();
  const {setUserImageUri} = useContext(Context);

  const detectObjectAndClassifyImage = uri => {
    let tflite = new Tflite();

    // model and label files in android/app/src/main/assets folder
    tflite.loadModel(
      {
        model: "not_mushroom_model.tflite", // required
        labels: "not_mushroom_labels.txt", // required
        numThreads: 1, // defaults to 1
      },
      (err, res) => {
        if (err) console.log(err);
        else console.log(res);
      },
    );

    tflite.runModelOnImage(
      {
        path: uri,
        imageMean: 128.0, // defaults to 127.5
        imageStd: 128.0, // defaults to 127.5
        numResults: 1, // defaults to 5
        threshold: 0.1, // defaults to 0.1
      },
      (err, res) => {
        if (err) {
          console.log("err", err);
        } else {
          console.log("res", res);
          if (res[0].label == "Not mushroom") {
            tflite.close();
            navigator.navigate("IdentifyResult", {results: res});
          } else {
            tflite.close();
            classifyImage(uri);
          }
        }
      },
    );
  };

  const classifyImage = uri => {
    let tflite = new Tflite();

    tflite.loadModel(
      {
        model: "2023-01-23.tflite", // required
        labels: "2023-01-23.txt", // required
        numThreads: 1, // defaults to 1
      },
      (err, res) => {
        if (err) console.log(err);
        else console.log(res);
      },
    );

    tflite.runModelOnImage(
      {
        path: uri,
        imageMean: 128.0, // defaults to 127.5
        imageStd: 128.0, // defaults to 127.5
        numResults: 3, // defaults to 5
        threshold: 0.2, // defaults to 0.1
      },
      (err, res) => {
        if (err) {
          tflite.close();
          console.log("err", err);
        } else {
          tflite.close();
          console.log("res", res);
          navigator.navigate("IdentifyResult", {results: res});
        }
      },
    );
  };

  const takeImage = async () => {
    try {
      let result = await launchCameraAsync({
        aspect: [1, 1],
        quality: 1,
        allowsEditing: true,
      });
      if (result.cancelled) {
        Alert.alert("Cancelled");
        return;
      } else {
        setUserImageUri(result.uri);
        detectObjectAndClassifyImage(result.uri);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const pickImage = async () => {
    try {
      let result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1,
        allowsEditing: true,
      });
      if (result.cancelled) {
        Alert.alert("Cancelled");
        return;
      } else {
        setUserImageUri(result.uri);
        detectObjectAndClassifyImage(result.uri);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      const cameraRollStatus = await requestMediaLibraryPermissionsAsync();
      const cameraStatus = await requestCameraPermissionsAsync();
      const locationStatus = await requestForegroundPermissionsAsync();
      if (
        cameraRollStatus.status !== "granted" ||
        cameraStatus.status !== "granted" ||
        locationStatus.status !== "granted"
      ) {
        Alert.alert("The app requires these permissions to work correctly.");
        return;
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>What is this mushroom?</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.2}
        onPress={() => {
          takeImage();
        }}
      >
        <Text style={styles.buttonText}>Take a Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.2}
        onPress={() => {
          pickImage();
        }}
      >
        <Text style={styles.buttonText}>Import from{"\n"}Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  titleText: {
    paddingBottom: 8,
    fontSize: 24,
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 3.5,
    textShadowColor: "#c5c5c5",
    textShadowOpacity: 0.25,
    marginBottom: 32,
    color: "black",
  },
  button: {
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    backgroundColor: Colors.background,
    width: width * 0.85,
    height: height * 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 45,
  },
  buttonText: {
    fontSize: 24,
    textAlign: "center",
    lineHeight: 32,
    color: "black",
  },
});

export default IdentifyScreen;
