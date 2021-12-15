import moment from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Color from "../../constants/Color";
import TransElement from "../UI/TransElement";

export default function TransactionDetails(props) {
  const history = props.navigation.getParam("history");
  console.log(history);
  return (
    <View>
      <TransElement color={Color.text} title="id" value={history.id} />
      <TransElement
        title="Status"
        color={Color.orangeFPT}
        value={history.status === 0 ? "Processing" : "Success"}
      />
      <TransElement
        color={Color.orangeFPT}
        title="Amount"
        value={history.amount}
      />
      <TransElement color={Color.text} title="Id From" value={history.idFrom} />
      <TransElement color={Color.text} title="Id To" value={history.idTo} />
      <TransElement
        color={Color.text}
        title="Name Transaction"
        value={history.name}
      />
      <TransElement
        color={Color.text}
        title="Date"
        value={moment(history.date).format("hh:mm:ss, DD-MM-YYYY ")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

TransactionDetails.navigationOptions = (nav) => {
  return {
    titleHeader: "History Detail",
    backgroundColor: Color.orangeFPT,
  };
};
