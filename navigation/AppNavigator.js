import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import React, {Component} from 'react';

import { createBottomTabNavigator } from "react-navigation-tabs";
import { Platform, View } from "react-native";

import AuthScreen from "../screens/user/AuthScreen";
import StartUpScreen from "../screens/StartUpScreen";
import RegisterScreen from "../screens/user/RegisterScreen";

import MainOverViewScreen from "../screens/beld/MainOverviewScreen";
import HistoryViewScreen from "../screens/beld/HistoryScreen";
import ServiceDetailScreen from "../components/ChildScreens/ServiceDetailScreen";

import * as AuthAction from "../store/actions/auth";

import Colors from "../constants/Color";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/auth";
import WalletScreen from "../screens/beld/WalletScreen";
import TopupMoney from "../screens/beld/TopupMoney";
import TransferMoneyScreen from "../screens/beld/TransferMoneyScreen";
import ParkingHistoryScreen from "../components/ChildScreens/ParkingHistoryScreen";
import CardScreen from "../screens/beld/CardScreen";
import Color from "../constants/Color";

const defaultNavOption = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    Register: RegisterScreen,
  },
  {
    defaultNavigationOptions: defaultNavOption,
  }
);

const MainAppScreen = createStackNavigator(
  {
    MainApp: MainOverViewScreen,
    ServiceDetail: ServiceDetailScreen,
    ParkingHistory: ParkingHistoryScreen,
  },
  {
    defaultNavigationOptions: {},
  }
);

const AppNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: MainAppScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5
            style={[{ color: tintColor }]}
            size={22}
            name={"home"}
          />
        ),
      },
    },
    History: {
      screen: HistoryViewScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 style={[{ color: tintColor }]} size={22} name={"gem"} />
        ),
      },
    },
    Topup: {
      screen: TopupMoney,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5
            style={[{ color: tintColor }]}
            size={22}
            name={"dollar-sign"}
          />
        ),
      },
    },
    Transfer: {
      screen: TransferMoneyScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5
            style={[{ color: tintColor }]}
            size={22}
            name={"exchange-alt"}
          />
        ),
      },
    },
    Card: {
      screen: CardScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5
            style={[{ color: tintColor }]}
            size={22}
            name={"address-card"}
          />
        ),
      },
    },
    Wallet: {
      screen: WalletScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5
            style={[{ color: tintColor }]}
            size={22}
            name={"wallet"}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      inactiveTintColor: Color.success,
      activeTintColor: Color.white,
      labelStyle: {
        fontSize: 12,
        fontWeight: "bold",
      },
      style: {
        backgroundColor: Color.orangeFPT,
      },
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Start: StartUpScreen,
  AuthUser: AuthNavigator,
  AppBELD: AppNavigator,
});

export default createAppContainer(MainNavigator);
