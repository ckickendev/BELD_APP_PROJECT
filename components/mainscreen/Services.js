import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { color } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import Color from "../../constants/Color";
import * as authAction from "../../store/actions/auth";
import Card from "../UI/Card";

export default function Services(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  let services = useSelector((state) => {
    return state.auth.listService;
  });
  const dispatch = useDispatch();

  const loadServices = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(authAction.fetchService());
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, setIsLoading, setError, loadServices]);

  useEffect(() => {
    setIsLoading(true);
    loadServices().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadServices]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Something is wrong</Text>
        <Button title="try again!" onPress={loadServices} />
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

  if (!isLoading && services.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No product found, maybe start adding some new !</Text>
      </View>
    );
  }

  const renderItemServices = (itemsData) => {
    return (
      <Card
        service={itemsData.item}
        color={Color.orangeFPT}
        style={styles.Card}
        name={itemsData.item.name}
        id={itemsData.item.id}
        count={itemsData.item.count}
        img={itemsData.item.img}
        price={itemsData.item.price}
        selectItemService={props.selectItemService}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      numColumns={1}
      data={services}
      style={styles.FlatList}
      renderItem={renderItemServices}
    />
  );
}

const styles = StyleSheet.create({
  FlatList: {
    color: Color.red,
  },
  Card: {
    marginHorizontal: 30,
    marginVertical: 50,
    height: 300,
  },
});
