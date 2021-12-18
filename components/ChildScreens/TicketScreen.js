import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { version } from "react/cjs/react.production.min";
import Color from "../../constants/Color";

export default function TicketScreen(props) {
  const canteenProperties = props.navigation.getParam("canteenInfo");
  console.log("canteeninfo", canteenProperties);
  return (
    <View style={styles.ticket}>
      <Text style={styles.eticket}>E-TICKET</Text>
      <Text style={styles.nameShop}>{canteenProperties.name}</Text>
      <ImageBackground
        source={{ uri: canteenProperties.image }}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.priceBox}>
        <Text style={{ color: Color.white, fontSize: 24 }}>Price</Text>
        <Text style={{ color: Color.white, fontSize: 20 }}>
          {canteenProperties.price}
        </Text>
      </View>

      <Image
        source={{
          uri: "https://lh3.googleusercontent.com/proxy/56RD4ZlbfwhvqFT0LPGhraoC6PoSukN2kINNz1iXmGKSTIZ8ZwL_Gq7yzGarZwufJHAnFJnRncTJf2_JGUUCO62NLif-pnb7DUhkzpeivm2S",
        }}
        resizeMode="cover"
        height={100}
        style={styles.image2}
      />
      <Text style={{fontSize: 20, color: Color.orangeFPT}}>Scan To Pay</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ticket: {
    marginVertical: 30,
    paddingVertical: 30,
    marginHorizontal: 30,
    alignItems: "center",
    textAlign: "center",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 14,
    backgroundColor: "white",
  },
  eticket: {
    fontSize: 24,
    fontWeight: "700",
    color: Color.orangeFPT,
  },
  nameShop: {
    fontSize: 20,
    fontWeight: "700",
    color: Color.orangeFPT,
    marginVertical: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  image2: {
    marginTop: 10,
    width: "100%",
    height: 50,
  },
  priceBox: {
    width: "100%",
    backgroundColor: Color.red,
    alignItems: "center",
  },
});

TicketScreen.navigationOptions = (nav) => {
  return {
    headerTitle: "Ticket Infomation",
  };
};
