import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Button, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import HeaderScreen from "../../components/mainscreen/HeaderScreen";
import SpaceMoney from "../../components/mainscreen/SpaceMoney";
import PersonalInfo from "../../components/subScreens/PersonalInfo";
import Card from "../../components/UI/Card";
import CircleUser from "../../components/UI/CircleUser";
import { logout } from "../../store/actions/auth";


export default function WalletScreen() {
  const userLogin = useSelector((state) => {
    return state.auth.userLogin;
  });
  const dispatch = useDispatch();
  
  console.log("UserLogin: ", userLogin);
  return (
    <View style={styles.screen}>
      <HeaderScreen wallet style={{ paddingBottom: 20, height: 250 }} />
      <CircleUser />
      <PersonalInfo user={userLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
  },
  image: {
    marginVertical: 30,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "blue",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  iconUser: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 30,
    paddingTop: 12,
    // paddingLeft: 4,
  },
});
