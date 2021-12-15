import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Color from "../../constants/Color";
// import { TouchableOpacity } from "react-native-gesture-handler";

export default function UserService(props) {
  return (
    <TouchableOpacity style={styles.userServiceContainer} >
      <FontAwesome5
        name={props.nameIcon}
        size={30}
        color={Color.white}
        style={styles.nameIcon}
      />
      <Text style={styles.nameService}>{props.nameService}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  userServiceContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  nameIcon: {
    // backgroundColor: "white",
  },
  nameService: {
    fontSize: 12,
    fontWeight: "400",
    color: "white",
  },
});
