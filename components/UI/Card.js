import React from "react";
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Color from "../../constants/Color";

export default function Card(props) {
  {
    console.log(props.img);
  }
  return (
    <TouchableOpacity
      style={{ ...styles.card, ...props.style }}
      onPress={() => {
        props.selectItemService(props.service);
      }}
    >
      <ImageBackground
        source={{ uri: props.img }}
        resizeMode="cover"
        style={styles.image}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <View
            style={{
              backgroundColor: props.color,
              marginTop: 0,
              width: "100%",
              alignItems: "center",
              opacity: 1,
            }}
          >
            <Text style={{ fontSize: 22, color: "white" }}>{props.name}</Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <View style={styles.listOptions}>
              <Text style={styles.textOptions}>Used: {props.count}</Text>
            </View>
            <View style={styles.listOptions}>
              <Text style={styles.textOptions}>Cost: {props.price}</Text>
            </View>
          </View>
        </View>
        {props.canteens ? (
          <Button
            title={`${props.service.open} - ${props.service.close}`}
            color={props.color}
            onPress={() => {}}
          />
        ) : (
          <Button title="Discover" color={props.color} onPress={() => {}} />
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    marginVertical: 30,
    flex: 1,
    justifyContent: "center",
  },
  card: {
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 14,
    backgroundColor: "white",
  },
  listOptions: {
    alignItems: "center",
    backgroundColor: "white",
    opacity: 0.7,
    width: "50%",
  },
  textOptions: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8A0829",
  },
});
