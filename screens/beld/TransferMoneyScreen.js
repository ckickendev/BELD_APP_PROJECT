import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/UI/Input";

import Color from "../../constants/Color";

export default function TransferMoneyScreen(props) {
  let [topUpAmount, SetTopUpAmount] = useState(0);
  const changeValueHandler = (value) => {
    let newTopUp;
    if (String(value).localeCompare("remove") === 0) {
      newTopUp = (topUpAmount - (topUpAmount % 10)) / 10;
    } else {
      newTopUp = topUpAmount * 10 + value;
    }
    SetTopUpAmount(newTopUp);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesome5
          name="long-arrow-alt-left"
          color="red"
          size={28}
          onPress={() => {
            props.navigation.navigate("Main");
          }}
        />
        <Text style={{ fontSize: 24, color: Color.text }}>Transfer money</Text>
        <FontAwesome5 name="search" color="red" size={28} />
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          color: "red",
          marginTop: 20,
        }}
      >
        Choose your account:    
      </Text>
      <View style={styles.boxAmount}>
        <Text style={styles.textBoxAmount}>$ {topUpAmount}</Text>
      </View>

      <View style={styles.inputSpace}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.buttonCircle}
            onPress={() => {
              changeValueHandler(1);
            }}
          >
            <Text style={styles.textAmount}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCircle}
            onPress={() => {
              changeValueHandler(2);
            }}
          >
            <Text style={styles.textAmount}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCircle}
            onPress={() => {
              changeValueHandler(3);
            }}
          >
            <Text style={styles.textAmount}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.buttonCircle}
            onPress={() => {
              changeValueHandler(4);
            }}
          >
            <Text style={styles.textAmount}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCircle}
            onPress={() => {
              changeValueHandler(5);
            }}
          >
            <Text style={styles.textAmount}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCircle}
            onPress={() => {
              changeValueHandler(6);
            }}
          >
            <Text style={styles.textAmount}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.buttonCircle}
            onPress={() => {
              changeValueHandler(7);
            }}
          >
            <Text style={styles.textAmount}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCircle}
            onPress={() => {
              changeValueHandler(8);
            }}
          >
            <Text style={styles.textAmount}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCircle}
            onPress={() => {
              changeValueHandler(9);
            }}
          >
            <Text style={styles.textAmount}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.buttonCircle}
            onPress={() => {
              changeValueHandler(0);
            }}
          >
            <Text style={styles.textAmount}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCircle}>
            <Text style={styles.textAmount}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCircle}
            onPress={() => {
              changeValueHandler("remove");
            }}
          >
            <FontAwesome5
              style={styles.textAmount}
              name="backspace"
              color="red"
            ></FontAwesome5>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonRequest}>
        <Button title="Send request" color="gray" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxAmount: {
    marginVertical: 30,
    marginHorizontal: 40,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderColor: "orange",
    borderWidth: 2,
    borderRadius: 30,
  },
  textBoxAmount: {
    fontSize: 30,
    color: Color.textPiece,
  },
  row: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonCircle: {
    textAlign: "center",
    alignItems: "center",
    width: 100,
    paddingVertical: 35,
    // backgroundColor: 'red',
    borderColor: "red",
  },
  textAmount: {
    fontSize: 20,
  },
  buttonRequest: {
    marginHorizontal: 40,
  },
});
