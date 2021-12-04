import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function SpaceMoney(props) {
  const money = useSelector((state) => state.auth.userLogin.balance);
  const [isShowMoney, setIsShowMoney] = useState(false);
  return (
    <View style={styles.accountContainer}>
      <View>
        <Text style={styles.textYA}>Your Account: </Text>
        <TouchableOpacity
          style={styles.balanceContaner}
          onPress={() => {
            setIsShowMoney(!isShowMoney);
          }}
        >
          <Text style={{ color: "red", marginRight: 5, fontSize: 16 }}>
            See your balance
          </Text>
          <FontAwesome5 name="eye" size={20} color="red" />
        </TouchableOpacity>
        <View style={{justifyContent: "center", alignItems: 'center'}}>
          {isShowMoney ? <Text style={{color: "red", fontSize: 20}}>Balance :{money}$</Text> : <Text></Text>}
        </View>
      </View>
      <TouchableOpacity style={styles.addMoneyContainer} onPress={props.goToTopUp}>
        <Text style={styles.addMoney}>Add money</Text>
        <FontAwesome5
          //   style={styles.plusMoney}
          name="plus-circle"
          size={30}
          color="red"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  accountContainer: {
    flexDirection: "row",
    width: "80%",
    marginTop: -30,
    marginHorizontal: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 50,
    borderRadius: 20,
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
});
