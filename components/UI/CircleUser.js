import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function CircleUser(props) {
  const user = useSelector((state) => state.auth.userLogin);
  console.log("User: ", user);
  return (
    <View style={styles.accountContainer}>
      <ImageBackground
        resizeMode="cover"
        style={{ ...styles.imgbackground, ...props.style }}
      >
        <View style={styles.iconUser}>
          <FontAwesome5
            name="user-shield"
            color="red"
            size={80}
            styles={{alignSelf: 'center'}}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  accountContainer: {
    flexDirection: "row",
    width: 160,
    height: 160,
    marginTop: -60,
    marginHorizontal: 400,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 50,
    borderRadius: 100,
    elevation: 3,
  },
  textYA: {
    fontSize: 14,
    color: "#D2691E",
  },
  balanceContaner: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  addMoneyContainer: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addMoney: {
    fontSize: 10,
    color: "red",
  },
  plusMoney: {
    fontSize: 30,
  },
  imgbackground: {
      width: '100%',
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  iconUser: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 50,
    paddingLeft: 16,
    // backgroundColor: 'red'
  },
});
