import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Directions, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import HistoryContent from "../../components/subScreens/HistoryContent";
import Color from "../../constants/Color";

export default function HistoryScreen(props) {
  const changeNav = (item) => {
    console.log(item);
    props.navigation.navigate("HistoryDetail", {"history": item});
  };

  const [actionBtn, setActionBtn] = useState(1);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesome5
          name="long-arrow-alt-left"
          color="red"
          size={28}
          onPress={() => {
            props.navigation.navigate("Main");
          }}
        />
        <Text style={{ fontSize: 24, color: Color.text }}>History</Text>
        <FontAwesome5 name="search" color="red" size={28} />
      </View>
      <View style={styles.action}>
        {actionBtn === 1 ? (
          <TouchableOpacity style={styles.activeBtn}>
            <Text style={styles.textActionBtn}>All</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {
              setActionBtn(1);
            }}
          >
            <Text style={styles.textActionBtn}>All</Text>
          </TouchableOpacity>
        )}
        {actionBtn === 2 ? (
          <TouchableOpacity style={styles.activeBtn}>
            <Text style={styles.textActionBtn}>Income</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {
              setActionBtn(2);
            }}
          >
            <Text style={styles.textActionBtn}>Income</Text>
          </TouchableOpacity>
        )}
        {actionBtn === 3 ? (
          <TouchableOpacity style={styles.activeBtn}>
            <Text style={styles.textActionBtn}>Outcome</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {
              setActionBtn(3);
            }}
          >
            <Text style={styles.textActionBtn}>Outcome</Text>
          </TouchableOpacity>
        )}
      </View>
      <HistoryContent
        changeNav={(item) => {
          changeNav(item);
        }}
        status={actionBtn}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  action: {
    marginTop: 30,
    marginBottom: 50,
    marginHorizontal: 60,
    backgroundColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 20,
  },
  actionBtn: {
    paddingVertical: 20,
    width: "100%",
    borderRadius: 20,
  },
  activeBtn: {
    borderRadius: 20,
    paddingVertical: 20,
    backgroundColor: "red",
  },
  textActionBtn: {
    paddingHorizontal: 30,
    width: "100%",
  },
});
HistoryScreen.navigationOptions = (nav) => {
  return {
    headerShown: false,
    backgroundColor: Color.orangeFPT
  };
};
