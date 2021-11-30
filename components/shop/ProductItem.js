import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../../constants/Color";
import Card from "../UI/Card";

export default function ProductItem(props) {
  let TouchableTMP = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableTMP = TouchableNativeFeedback;
  }
  return (
    <TouchableNativeFeedback onPress={props.onSelect} useForeground>
      <Card style={styles.product}>
        <View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.imageURL }} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}> {props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.buttonContainer}>{props.children}</View>
        </View>
      </Card>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 330,
    padding: 20,
    margin: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    marginVertical: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  infoContainer: {
    textAlign: "center",
    justifyContent: "center",

    // marginVertical: 20
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: "12%",
    // paddingVertical: 10
  },
});
