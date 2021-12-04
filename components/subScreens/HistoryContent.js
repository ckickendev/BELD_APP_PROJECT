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
import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import HistoryElements from "../UI/HistoryElement";

import * as authAction from "../../store/actions/auth";

export default function HistoryContent(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  let histories = useSelector((state) => {
    return state.auth.listHistories;
  });
  if (props.status === 3) {
    histories = histories.filter((history) => history.type === 1);
  } else if (props.status === 2) {
    histories = histories.filter((history) => history.type === 2);
  }
  const dispatch = useDispatch();

  const loadHistories = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(authAction.fetchHistory());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError, loadHistories]);

  useEffect(() => {
    setIsLoading(true);
    loadHistories().then(() => {
      console.log("List History: ", histories);
      setIsLoading(false);
    });
  }, [dispatch, loadHistories]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Something is wrong</Text>
        <Button title="try again!" onPress={loadHistories} />
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

  if (!isLoading && histories.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No product found, maybe start adding some new !</Text>
      </View>
    );
  }
  return (
    <FlatList
      onRefresh={loadHistories}
      refreshing={false}
      data={histories}
      keyExtractor={(item) => {
        return item.id;
      }}
      renderItem={(itemData) => {
        let numIcon = "parking";
        if (itemData.item.service === 4) {
          numIcon = "graduation-cap";
        } else if (itemData.item.service === 3) {
          numIcon = "hotel";
        } else if (itemData.item.service === 2) {
          numIcon = "money-bill";
        }
        let PosOrNeg = itemData.item.type === 1 ? "-" : "+";
        return (
          <HistoryElements
            PosOrNeg={PosOrNeg}
            nameIcon={numIcon}
            color="red"
            history={itemData.item}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({});
