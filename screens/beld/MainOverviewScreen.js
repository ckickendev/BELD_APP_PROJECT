import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import HeaderScreen from "../../components/mainscreen/HeaderScreen";
import Services from "../../components/mainscreen/Services";
import SpaceMoney from "../../components/mainscreen/SpaceMoney";
import { logout } from "../../store/actions/auth";

export default function MainScreen(props) {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  const goToTopUp = () => {
    props.navigation.navigate("Topup");
  };
  const selectItemService = (service) => {
    console.log(service);
    props.navigation.navigate("ServiceDetail", { service: service });
  };
  return (
    <View style={styles.screen}>
      <HeaderScreen logoutHandler={logoutHandler} style={{ height: 400 }} />
      <SpaceMoney goToTopUp={goToTopUp} />
      <Services selectItemService={selectItemService} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  button: {
    padding: 30,
  },
});

MainScreen.navigationOptions = (navData) => {
  return {
    headerShown: false,
  };
};
