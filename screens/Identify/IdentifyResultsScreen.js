import React, {useEffect, useContext, useState} from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {useNavigation} from "@react-navigation/native";

// Context
import {Context} from "../../store/context";

// Colors
import Colors from "../../constants/colors";

// Window size
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const IdentifyResultsScreen = props => {
  const navigator = useNavigation();
  const {mushroomData} = useContext(Context);
  const [result, setResult] = useState([]);
  const [noResultText, setNoResultText] = useState("No results found.");
  const tempResult = props.route.params.results;

  const getResult = () => {
    if (tempResult.length === 0) {
      setResult([]);
    } else {
      if (
        tempResult[0].label == "Not mushroom" ||
        tempResult[0].label == "None of the above"
      ) {
        if (tempResult[0].label == "Not mushroom") {
          setNoResultText("We aren't sure whether it's a mushroom or not.");
        } else if (tempResult[0].label == "None of the above") {
          setNoResultText("We can't identify this mushroom.");
        }

        setResult([]);
        return;
      }

      let tempArr = [];
      for (let j = 0; j < tempResult.length; ++j) {
        for (let i = 0; i < mushroomData.length; ++i) {
          if (tempResult[j].label == mushroomData[i].mush_name) {
            tempArr.push({
              ...mushroomData[i],
              confidence: tempResult[j].confidence,
            });
            break;
          }
        }
      }
      setResult(tempArr);
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.resultsContainer}>
        {result.length !== 0 &&
          result.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={styles.resultContainer}
                  onPress={() => {}}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={{uri: item.uri}}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.resultText}>{item.mush_name}</Text>
                  <View style={styles.confidenceContainer}>
                    <Text style={{fontSize: 16, color: "black"}}>
                      {parseInt(item.confidence * 100)} %
                    </Text>
                  </View>
                  <Image
                    source={require("../../assets/icons/chevron-forward-outline.png")}
                    resizeMode="contain"
                    style={{width: 33, height: 33}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    width: "100%",
                    marginTop: 12,
                  }}
                />
              </View>
            );
          })}
        {result.length === 0 && (
          <View
            style={{
              width: width,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: width * 0.85,
                alignItems: "flex-start",
                justifyContent: "center",
                marginTop: 20,
                padding: 24,
                borderRadius: 16,
                backgroundColor: Colors.first,
              }}
            >
              <Text style={{fontSize: 16, color: "black"}}>{noResultText}</Text>
            </View>
            <TouchableOpacity
              style={{
                width: width * 0.85,
                paddingVertical: 24,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                backgroundColor: Colors.third,
                borderRadius: 16,
                marginBottom: 16,
                elevation: 5,
                shadowColor: "#000",
                shadowOpacity: 0.25,
                shadowRadius: 3.5,
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
              }}
              onPress={() => {}}
            >
              <Text
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  //fontWeight: "bold",
                  color: "black",
                }}
              >
                Ask our mycologist
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.contactContainer}>
        <Text style={styles.contactText}>
          The results shown are just for reference.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  resultsContainer: {
    flex: 1,
    width: width,
    alignItems: "center",
  },
  resultContainer: {
    width: width * 0.85,
    height: height * 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    borderRadius: 16,
    width: 73,
    height: 73,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 110,
    height: 110,
  },
  resultText: {
    fontSize: 16,
    width: width * 0.37,
    marginLeft: 16,
    fontStyle: "italic",
    color: "black",
  },
  confidenceContainer: {
    width: width * 0.16,
    height: 29,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contactContainer: {
    width: width * 0.85,
    height: width * 0.15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: Colors.background,
    marginBottom: 26,
  },
  contactText: {
    fontSize: 16,
    textAlign: "center",
    color: "black",
  },
});

export default IdentifyResultsScreen;
