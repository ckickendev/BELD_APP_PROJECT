import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationActions } from "react-navigation";
import { useSelector } from "react-redux";
import ShopNavigator from "./ShopNavigator";

export default function NavigationContainer(props) {
  const navRef = useRef();
  const isAuth = useSelector((state) => {
    return !!state.auth.token;
  });
  useEffect(() => {
    console.log("dang check auth");
    if (!isAuth) {
      console.log("Gia tri cua auth la ", isAuth);
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
      return;
    }else{
      console.log("Gia tri cua auth la true");
    }
  }, [isAuth]);
  return <ShopNavigator ref={navRef} />;
}

const styles = StyleSheet.create({});
