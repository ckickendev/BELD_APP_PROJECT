import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware} from "redux";
import { Provider } from "react-redux";
import ReduxThunk from 'redux-thunk';

import authReducer from "./store/reducers/auth";
import serviceReducer from "./store/reducers/service";

import NavigationContainer from "./navigation/NavigationContainer";

const rootReducer = combineReducers({
  auth: authReducer,
  service: serviceReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
