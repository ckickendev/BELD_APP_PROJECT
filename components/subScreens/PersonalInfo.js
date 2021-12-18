import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Color from "../../constants/Color";
import Box from "../UI/Box";

import { logout } from "../../store/actions/auth";
import { useDispatch } from "react-redux";

export default function PersonalInfo(props) {
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <View style={styles.infoWrapper}>
        <Text style={{ fontSize: 12 }}>Personal Info</Text>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>ID</Text>
          <Text style={{ width: "60%", color: Color.text }}>
            {props.user.studentId}
          </Text>
          <TouchableOpacity>
            <Text style={styles.change}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>Fullname</Text>
          <Text style={{ width: "60%", color: Color.text }}>
            {props.user.fullname}
          </Text>
          <TouchableOpacity>
            <Text style={styles.change}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>Email</Text>
          <Text style={{ width: "60%", color: Color.text }}>
            {props.user.email}
          </Text>
          <TouchableOpacity>
            <Text style={styles.change}>Change</Text>
          </TouchableOpacity>
        </View>
        {/* <Button
          title="Log out"
          onPress={() => {
            dispatch(logout());
          }}
        /> */}
      </View>
      <ScrollView style={styles.infoWrapper}>
        <Text style={{ fontSize: 12, marginBottom: 20 }}>My banking Info</Text>
        <Box PersonalInfo user={props.user} />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  infoWrapper: {
    padding: 20,
    paddingBottom: 0,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    alignItems: "center",
  },
  textTitle: {
    width: "20%",
    fontSize: 16,
    fontWeight: "bold",
  },
  change: {
    color: "red",
  },
});
