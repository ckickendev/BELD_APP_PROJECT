import React from "react";
import {
  Alert,
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationActions } from "react-navigation";
import Color from "../../constants/Color";

export default function CanteenSlot(props) {
  const onBuyTicket = (service) => {
    console.log("Service:", service);
    props.onBuyTicket(service);
  };
  return (
    <TouchableOpacity
      style={{ ...styles.card, ...props.style }}
      onPress={() => {
        props.selectItemService(props.service);
        Alert.alert(
          "Confirm!",
          `Do you want to purchase, Price: ${props.price} `,
          [
            { text: "Cancel"},
            { text: "OK", onPress: () => onBuyTicket(props.service) },
          ],
          {
            cancelable: true,
            onDismiss: () =>
              Alert.alert(
                "This alert was dismissed by tapping outside of the alert dialog."
              ),
          }
        );
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
        <Button
          title={`${props.service.open} - ${props.service.close}`}
          color={props.color}
          //   onPress={onCanteenHandler}
        />
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
