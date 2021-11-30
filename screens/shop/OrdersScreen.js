import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react/cjs/react.development";
import OrderItem from "../../components/shop/OrderItem.js";

import HeaderButton from "../../components/UI/HeaderButton.js";
import * as orderActions from '../../store/actions/order'

export default function OrdersScreen() {
  const orders = useSelector((state) => state.orders.orders);
  
  const [isLoadedOrders, setIsLoadedOrders] = useState(false);
  const dispatch = useDispatch(); 

  useEffect(()=>{
    setIsLoadedOrders(true);
    dispatch(orderActions.fetchOrders()).then(() => {
      setIsLoadedOrders(false);
    })
  }, [dispatch])

  if(isLoadedOrders){
    return <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}><ActivityIndicator size="large" color="red" /></View>
  }
  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Not have product, please add another one</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          totalAmount={itemData.item.totalAmount}
          date={itemData.item.toDate}
          items={itemData.item}
          deleteAble="true"
        />
      )}
    />
  );
}

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
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
  };
};

const styles = StyleSheet.create({});
