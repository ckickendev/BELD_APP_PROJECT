import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import HeaderScreen from "../../components/mainscreen/HeaderScreen";
import Services from "../../components/mainscreen/Services";
import SpaceMoney from "../../components/mainscreen/SpaceMoney";
import { logout } from "../../store/actions/auth";

export default function MainScreen(props) {
  const dispatch = useDispatch();
  const goToTopUp = () => {
    props.navigation.navigate("Topup");
  }
  return (
    <View style={styles.screen}>
      <HeaderScreen style={{ height: 400 }} />
      <SpaceMoney goToTopUp={goToTopUp} />
      <Services />
      <Button
        title="Logout"
        onPress={() => {
          dispatch(logout());
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex: 1
  }
});
