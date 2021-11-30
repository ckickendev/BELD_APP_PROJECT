import React from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import Color from "../../constants/Color";
import * as cartActions from "../../store/actions/cart";

export default function ProductDetailScreen(props) {
  const dispatch = useDispatch();
  const id = props.navigation.getParam("productId");
  const useProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === id)
  );
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: useProduct.imageURL }} />
      <View style={styles.buttonContainer}>
        <Button
          color={Color.primary}
          style={styles.button}
          title="Add to cart"
          onPress={() => {
            dispatch(cartActions.addToCart(useProduct));
          }}
        />
      </View>
      <View style={styles.info}>
        <Text>${useProduct.price}</Text>
        <Text>{useProduct.description}</Text>
      </View>
    </ScrollView>
  );
}

ProductDetailScreen.navigationOptions = (navData) => {
  headerTitle: navData.navigation.getParam("productTitle");
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
    marginVertical: 20,
  },
  buttonContainer: {
    alignItems: "center",
  },
  info: {
    alignItems: "center",
    marginVertical: 10,
  },
});
