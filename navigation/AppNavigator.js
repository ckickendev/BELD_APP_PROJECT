
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { createBottomTabNavigator } from "react-navigation-tabs";
import { Platform } from "react-native";

import AuthScreen from "../screens/user/AuthScreen";
import StartUpScreen from "../screens/StartUpScreen";
import RegisterScreen from "../screens/user/RegisterScreen";

import MainOverViewScreen from "../screens/beld/MainOverviewScreen";
import HistoryViewScreen from "../screens/beld/HistoryScreen";

import * as AuthAction from "../store/actions/auth";

import Colors from "../constants/Color";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/auth";
import WalletScreen from "../screens/beld/WalletScreen";
import TopupMoney from "../screens/beld/TopupMoney";
import TransferMoneyScreen from "../screens/beld/TransferMoneyScreen";

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

const AppNavigator = createBottomTabNavigator(
  {
    Main: MainOverViewScreen,
    History : HistoryViewScreen,
    Topup: TopupMoney,
    Transfer: TransferMoneyScreen,
    Wallet: WalletScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: "white",
      color: 'blue',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: "red",
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
