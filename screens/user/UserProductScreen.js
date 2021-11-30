import React, { useReducer } from "react";
import { FlatList, StyleSheet, Button, Text, View, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Color";
import * as ProductAction from "../../store/actions/product";

export default function UserProductScreen(props) {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const editScreenHanddler = (id) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure to delete", "Really to delete", [
      { text: "no", style: "default" },
      {
        text: "yes",
        style: "destructive",
        onPress: () => {
          dispatch(ProductAction.deleteProduct(id));
        },
      },
    ]);
  };
  if(userProducts.length === 0){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Not have product, please add another one</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(dataItem) => (
        <ProductItem
          imageURL={dataItem.item.imageURL}
          title={dataItem.item.title}
          price={dataItem.item.price}
          onSelect={() => {
            editScreenHanddler(dataItem.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editScreenHanddler(dataItem.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              deleteHandler(dataItem.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
}

UserProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName="md-create"
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});
