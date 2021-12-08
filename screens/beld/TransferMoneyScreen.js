import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Color from "../../constants/Color";
import ListUsers from "../../components/subScreens/ListUsers";

import * as serviceAction from "../../store/actions/service";
import { useDispatch, useSelector } from "react-redux";

export default function TransferMoneyScreen(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const userId = useSelector((state) => {
    return state.auth.userLogin.id;
  });
  let balanceSend = useSelector((state) => {
    return state.auth.userLogin.balance;
  });
  let newAmountSend;
  useEffect(() => {
    balanceSend = newAmountSend;
  }, [onRequestHandle]);
  const [chooseAccount, setChooseAccount] = useState(false);
  const [chooseId, setChooseId] = useState(0);
  const [textName, setTextName] = useState("");
  const [recieve, setRecieve] = useState(0);
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

  const onChooseEmail = (value, id, amount) => {
    console.log("Onchoose email Value, Id:", value, id, amount);
    setChooseAccount(false);
    setTextName(value);
    chooseIdHandle(id);
    chooseRecieve(amount);
  };

  const chooseIdHandle = (id) => {
    setChooseId(id);
  };

  const chooseRecieve = (amount) => {
    setRecieve(amount);
  };

  const onRequestHandle = async () => {
    const amount = topUpAmount;
    const chooseIdNe = chooseId;
    const studentId = textName;
    const newAmountRecieve = recieve + amount;
    newAmountSend = balanceSend - amount;
    if (newAmountSend < 0) {
      Alert.alert("Waring", "Your balance is not enough !", [{ title: "Yes" }]);
    } else {
      await serviceAction.createTransferRequest(
        amount,
        userId,
        chooseIdNe,
        studentId,
        token,
        newAmountRecieve,
        newAmountSend
      );
      console.log("so tien, new amount send", amount, newAmountSend);
      await dispatch(serviceAction.updateAmount(newAmountSend));
      setChooseAccount(false);
      setChooseId(0);
      setTextName("");
      setRecieve(0);
      SetTopUpAmount(0);
      Alert.alert("System !", "Successfully!", [{ title: "Confirm" }]);
    }
    console.log(
      "amount ,chooseId, studentId: ",
      amount,
      chooseIdNe,
      studentId,
      newAmountRecieve,
      newAmountSend
    );
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
        Choose your account (email)
      </Text>
      <View>
        <TextInput
          style={styles.textName}
          label="email"
          value={textName}
          onChangeText={(text) => {
            setChooseAccount(true);
            setTextName(text);
          }}
          onFocus={() => {
            setChooseAccount(true);
          }}
          onBlur={() => {
            setChooseAccount(false);
          }}
        />
        {chooseAccount ? (
          <ListUsers
            onChooseEmail={(value, id, balance) => {
              onChooseEmail(value, id, balance);
            }}
          />
        ) : (
          <View></View>
        )}
        <View></View>
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          color: "red",
          marginTop: 20,
        }}
      >
        Amount
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
        <Button title="Send request" color="gray" onPress={onRequestHandle} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textName: {
    textAlign: "center",
    marginVertical: 10,
    marginHorizontal: 40,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 30,
  },
  boxAmount: {
    marginVertical: 10,
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
    width: 60,
    paddingVertical: 20,
    borderColor: "red",
  },
  textAmount: {
    fontSize: 20,
  },
  buttonRequest: {
    marginHorizontal: 40,
  },
  inputSpace: {},
});
