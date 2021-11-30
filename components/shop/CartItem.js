import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CartItem(props) {
  return (
    <View style={styles.screen}>
      <Text style={styles.infoWrapper}>
        <Text style={styles.qtt}>{props.quantity}</Text>
        <Text style={styles.title}>{props.title}</Text>
      </Text>
      <View style={styles.buyWrapper}>
        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        {props.deleteAble && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.removeTouchable}
          >
            <Ionicons name="md-trash" size={23} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginVertical: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginHorizontal: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoWrapper: {
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buyWrapper: {
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qtt: {
    marginHorizontal: 20,
  },
  title: {
    margin: 20,
  },
});
