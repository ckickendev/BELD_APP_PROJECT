import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Color from '../../constants/Color';

export default function TransElement(props) {
    return (
      <View style={styles.container}>
        <Text style={{ ...styles.title, color: props.color }}>
          {props.title}
        </Text>
        <Text style={{ ...styles.value, color: props.color }}>
          {props.value}
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    paddingHorizontal: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  title: {
    color: Color.text,
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    color: Color.text,
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
  },
});
