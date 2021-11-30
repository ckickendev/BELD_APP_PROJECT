import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import CartItem from "./CartItem";

export default function OrderItem(props) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.screen}>
      <View style={styles.infoBillWrapper}>
        <Text style={styles.totalAmount}>
          Total :${props.totalAmount.toFixed(2)}
        </Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        title="show details"
        onPress={() => {
          setShowDetails((prev) => !prev);
        }}
      />
      {showDetails && (
        <View>
          {props.items.items.map((cartItem, key) => (
            <CartItem
              key={key}
              quantity={cartItem.quantity}
              title={cartItem.productTitle}
              price={cartItem.productPrice}
              deleteAble={false}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  infoBillWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: "red",
    marginVertical: 10,
  },
  date: {
    fontSize: 14,
    fontWeight: "700",
    color: "red",
    marginVertical: 10,
  },
});
