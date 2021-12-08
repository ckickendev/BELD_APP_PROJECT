import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react/cjs/react.development";
import Color from "../../constants/Color";

import * as serviceAction from "../../store/actions/service";
import HistoryElements from "../UI/HistoryElement";


export default function ListDormitoryHistory() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  let listDorHistory = useSelector((state) => {
    return state.service.listDorHistory;
  });

  const dispatch = useDispatch();

  const loadDorHistory = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(serviceAction.fetchHistoryDormitory());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError, loadDorHistory]);

  useEffect(() => {
    setIsLoading(true);
    loadDorHistory().then(() => {
      // console.log("List canteen: ", canteens);
      setIsLoading(false);
    });
  }, [dispatch, loadDorHistory]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Something is wrong</Text>
        <Button title="try again!" onPress={loadDorHistory} />
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

  if (!isLoading && listDorHistory.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No canteen found, maybe start adding some new !</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ paddingBottom: 140 }}>
      <FlatList
        data={listDorHistory}
        keyExtractor={(key) => key.id}
        renderItem={(itemsData) => {
          console.log("Render FL: ", itemsData.item);
          const history = {
            name: "In/Out History",
            toDate: moment(itemsData.item.date).format("hh:mm:ss, DD-MM-YYYY "),
            amount: itemsData.item.type
          };
          return (
            <View>
              <HistoryElements
                domitory
                nameIcon="hotel"
                color={Color.red}
                history={history}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
