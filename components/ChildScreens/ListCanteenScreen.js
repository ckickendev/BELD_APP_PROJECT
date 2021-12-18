import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react/cjs/react.development";
import Color from "../../constants/Color";
import * as serviceAction from "../../store/actions/service";
import CanteenSlot from "../UI/CanteenSlot";
import Card from "../UI/Card";

export default function ListCanteenScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  let canteens = useSelector((state) => {
    return state.service.listCanteens;
  });

  const dispatch = useDispatch();

  const loadCanteens = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(serviceAction.fetchCanteen());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError, loadCanteens]);

  useEffect(() => {
    setIsLoading(true);
    loadCanteens().then(() => {
      // console.log("List canteen: ", canteens);
      setIsLoading(false);
    });
  }, [dispatch, loadCanteens]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Something is wrong</Text>
        <Button title="try again!" onPress={loadCanteens} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red"></ActivityIndicator>
      </View>
    );
  }

  if (!isLoading && canteens.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No canteen found, maybe start adding some new !</Text>
      </View>
    );
  }

  
  return (
    <SafeAreaView style={{paddingBottom: 140}}>
      <FlatList
        data={canteens}
        keyExtractor={(key) => key.id}
        renderItem={(itemsData) => {
          // console.log("Render FL: ", itemsData.item);
          return (
            <CanteenSlot
              onBuyTicket = { (canteenInfo) => {props.onBuyTicket(canteenInfo)}}
              canteens
              service={itemsData.item}
              color={Color.primary}
              style={styles.Card}
              name={itemsData.item.name}
              id={itemsData.item.id}
              count={itemsData.item.count}
              img={itemsData.item.image}
              price={itemsData.item.price}
              selectItemService={() => {}}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Card: {
    height: 300,
    marginHorizontal: 30,
    marginVertical: 30,
  },
});
