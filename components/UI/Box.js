import React from "react";
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Box(props) {
  {
    console.log(props.img);
  }
  return (
    <View style={{ ...styles.card, ...props.style }}>
      <TouchableOpacity
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.left}>
          <Image
            style={styles.stretch}
            source={require("../../assets/image/logo_fpt_transparent.png")}
          />
        </View>
        <View style={styles.right}>
          <Text>{props.user.id}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  stretch: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  image: {
    width: "100%",
    marginVertical: 30,
    flex: 1,
    justifyContent: "center",
  },
  icon: {
    // width: '100%'
  },
  card: {
    shadowColor: "black",
    shadowOffset: {  width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 0.2,
    borderRadius: 12,
    paddingHorizontal: 30,
    borderColor: "red",
    backgroundColor: "white",
    marginBottom: 20,
  },
  left: {
    width: "40%",
  },
});
