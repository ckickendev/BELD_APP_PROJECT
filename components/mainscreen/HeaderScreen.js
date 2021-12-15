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
import { useDispatch, useSelector } from "react-redux";
import Color from "../../constants/Color";

import { logout } from "../../store/actions/auth";


export default function HeaderScreen(props) {
  const userLogin = useSelector((state) => {
    return state.auth.userLogin;
  });
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <ImageBackground
        source={{}}
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
                <Text style={{ ...styles.textUser, marginLeft: 20 }}>
                  {userLogin === undefined ? "USER" : userLogin.fullname}
                </Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity>
                  <FontAwesome5
                    style={styles.searchIcon}
                    name="search"
                    color={Color.orangeFPT}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.header}>
              <TouchableOpacity style={{ alignItems: "center", width: "100%" }}>
                <Text
                  style={{
                    ...styles.textUser,
                    textAlign: "center",
                    fontSize: 24,
                    color: Color.white,

                    // fontWeight: 'bold'
                  }}
                >
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
            <TouchableOpacity
              style={styles.userServiceContainer}
              onPress={() => {
                props.logoutHandler();
              }}
            >
              <FontAwesome5
                name="walking"
                size={30}
                color={Color.white}
                style={styles.nameIcon}
              />
              <Text style={styles.nameService}>Logout</Text>
            </TouchableOpacity>
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
    backgroundColor: Color.orangeFPT,
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
  },
  textUser: {
    // marginLeft: 20,
    fontSize: 20,
    color: Color.white,
  },
  searchIcon: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: Color.white,
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
