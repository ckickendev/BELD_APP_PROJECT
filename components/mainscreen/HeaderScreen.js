import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import UserService from "../Service/UserService";
import { useSelector } from "react-redux";

export default function HeaderScreen(props) {
  const userLogin = useSelector((state) => {
    return state.auth.userLogin;
  });
  // console.log(userLogin);

  return (
    <ScrollView>
      <ImageBackground
        source={{
          uri: "https://st3.depositphotos.com/32032774/36825/v/450/depositphotos_368255430-stock-illustration-abstract-clean-red-mesh-gradient.jpg",
        }}
        resizeMode="cover"
        style={{ ...styles.imageBackground, ...props.style }}
      >
        <View style={styles.forUser}>
          {!props.wallet ? (
            <View style={styles.header}>
              <TouchableOpacity style={styles.user}>
                <FontAwesome5
                  style={styles.iconUser}
                  name="user-shield"
                  color="red"
                  size={25}
                />
                <Text style={styles.textUser}>
                  {userLogin === undefined ? "USER" : userLogin.fullname}
                </Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity>
                  <FontAwesome5
                    style={styles.searchIcon}
                    name="search"
                    color="red"
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.header}>
              <TouchableOpacity style={{ alignItems: "center", width: "100%" }}>
                <Text style={{ ...styles.textUser, alignSelf: "center", fontSize: 22, color: "yellow" }}>
                  {userLogin === undefined ? "USER" : userLogin.fullname}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.userMoney}>
            <UserService
              nameIcon="money-bill-wave"
              nameService="Transfer Money"
            />
            <UserService
              nameIcon="money-check-alt"
              nameService="Recieve Money"
            />
            <UserService nameIcon="wallet" nameService="Get money" />
            <UserService nameIcon="money-check" nameService="Connect Card" />
          </View>
        </View>
      </ImageBackground>

      <View style={styles.forService}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: 250,
  },
  header: {
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
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
  textUser: {
    marginLeft: 10,
    fontSize: 18,
    color: "yellow",
  },
  searchIcon: {
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
  userMoney: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
