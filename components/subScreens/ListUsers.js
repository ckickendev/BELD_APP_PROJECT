import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react/cjs/react.development";
import Color from "../../constants/Color";
import * as authAction from "../../store/actions/auth";

export default function ListUsers(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  let usersChoose = useSelector((state) => {
    return state.auth.listUsers;
  });
  const emailLogin = useSelector((state) => {
    return state.auth.userLogin.email;
  });
  const users = usersChoose.filter((user) => {
    console.log(user.email + "===" + emailLogin);
    return user.email.localeCompare(emailLogin) != 0;
  });
  const dispatch = useDispatch();

  const loadUsers = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(authAction.fetchUsers());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError, loadUsers]);

  useEffect(() => {
    setIsLoading(true);
    loadUsers().then(() => {
      console.log("List Users: ", users);
      setIsLoading(false);
    });
  }, [dispatch, loadUsers]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Something is wrong</Text>
        <Button title="try again!" onPress={loadUsers} />
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

  if (!isLoading && users.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No product found, maybe start adding some new !</Text>
      </View>
    );
  }
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      numColumns={1}
      data={users}
      renderItem={(dataItem) => {
        return (
          <TouchableOpacity
            style={styles.boxAmount}
            onPress={() => {
              console.log(dataItem.item);
              props.onChooseEmail(
                dataItem.item.email,
                dataItem.item.id,
                dataItem.item.balance
              );
            }}
          >
            <Text style={styles.textBoxAmount}>{dataItem.item.email}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  boxAmount: {
    marginHorizontal: 40,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderColor: Color.text,
    borderWidth: 1,
    borderRadius: 4,
  },
  textBoxAmount: {
    textAlign: "center",
    color: Color.textPiece,
  },
});
