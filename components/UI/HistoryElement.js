import { FontAwesome5 } from "@expo/vector-icons";
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
import { NavigationActions } from "react-navigation";
import { useDispatch } from "react-redux";
import Color from "../../constants/Color";

export default function HistoryElements(props) {
  return (
    <View style={{ ...styles.card, ...props.style }}>
      <TouchableOpacity
        onPress={props.changeNav}
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.left}>
          <FontAwesome5 name={props.nameIcon} color={props.color} size={24} />
        </View>
        <View style={styles.center}>
          <View>
            <Text
              style={{ fontSize: 16, color: Color.text, fontWeight: "600" }}
            >
              {props.history.name}
            </Text>
            <Text
              style={{ fontSize: 12, color: Color.text, fontWeight: "500" }}
            >
              {props.history.toDate}
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          {props.domitory ? (
            <Text style={styles.domitoryTitle}>{props.history.amount}</Text>
          ) : (
            <View>
              <Text style={{ color: props.color }}>
                {props.PosOrNeg}
                {props.history.amount}(V)
              </Text>
              {props.history.status === 1 ? (
                <Text style={{ color: props.color }}>Success</Text>
              ) : (
                <Text style={{ color: props.color }}>Processing</Text>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 14,
    elevation: 5,
    borderRadius: 16,
    paddingHorizontal: 20,
    borderColor: "red",
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 30,
    paddingVertical: 14,
  },
  left: {
    alignItems: "center",
    width: "14%",
    // backgroundColor: "red",
  },
  center: {
    width: "60%",
  },
  right: {
    width: "25%",
    alignItems: "flex-start",
  },
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

  domitoryTitle: {
    textAlign: "center",
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
});
