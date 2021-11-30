import React from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { set } from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react/cjs/react.development";

import CartItem from "../../components/shop/CartItem";

import { removeFromCart } from "../../store/actions/cart";
import * as orderAction from "../../store/actions/order";

export default function CartScreen(props) {
  const total = useSelector((state) => state.cart.totalAmount);
  const [isLoaded, setIsLoaded] = useState(false);

  const addOrderHandler = async () => {
    setIsLoaded(true);
    await dispatch(orderAction.addOrder(cartItems, total));
    setIsLoaded(false);
  };

  let cartItems = [];
  cartItems = useSelector((state) => {
    let cartItemsStateTmp = [];
    for (const key in state.cart.items) {
      cartItemsStateTmp.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return cartItemsStateTmp.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <View style={styles.infoComponent}>
        <Text style={styles.price}>Total: ${total.toFixed(2)}</Text>
        {isLoaded ? (
          <View>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <Button
            style={styles.orders}
            title="Order Now"
            disabled={cartItems === undefined}
            onPress={addOrderHandler}
          />
        )}
      </View>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(data) => (
            <CartItem
              quantity={data.item.quantity}
              title={data.item.productTitle}
              price={data.item.sum}
              onRemove={() => {
                dispatch(removeFromCart(data.item.productId));
              }}
              deleteAble="true"
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 10,
  },
  infoComponent: {
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "red",
  },
  orders: {},
});
