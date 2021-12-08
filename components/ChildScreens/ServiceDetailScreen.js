import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Color from "../../constants/Color";
import ListCanteenScreen from "./ListCanteenScreen";
import ListDormitoryHistory from "./ListDormitoryHistory";

export default function ServiceDetailScreen(props) {
  const service = props.navigation.getParam("service");
  const renderServices = () => {
    console.log("service.id: ", service.id);
    if (service.id.localeCompare("2") === 0) {
      return (
        <View>
          <Text style={styles.title}>List Canteen You Can Choose </Text>
          <ListCanteenScreen />
        </View>
      );
    } else if (service.id.localeCompare("-1") === 0) {
      return (
        <ScrollView style={styles.wrapperCanteen}>
          <Text style={styles.textCanteenTitle}>
            Tap Card To Reader To Purchase
          </Text>
          <Button title="View History" color="red" onPress={()=>{
              props.navigation.navigate("ParkingHistory");
          }} />
          <Text style={styles.textCanteen}>
            The parking system will have the basic functions of existing systems
            and add some functions suitable for our university.
          </Text>
          <Text style={styles.textCanteen}>
            The system includes the recognition camera, mobile app and the
            barrier system. Barrier checks and allow users to pass through this
            area, the camera uses automatic number-plate recognition.
          </Text>
          <Text style={styles.textCanteen}>
            Users will be able to check two things, the first is the automatic
            number-plate recognition with the camera, and the second is to check
            the account on the phone application. The user will be allowed to
            let the vehicle pass the barrier if it satisfies the condition that
            the camera recognizes the license plate and saves this data.
            Secondly, your account has a balance to pay for keeping. car. After
            confirming you your balance is still available to pay, the system
            will automatically confirm and update your account balance. You will
            then be allowed to pass the barrier and keep the vehicle as usual.
            When you receive the vehicle and leave, you just need to go to the
            barrier, then the camera again checks the license plate. You will
            pass the barrier and leave.
          </Text>
          <Text style={styles.textCanteen}>
            The camera system uses license plate recognition, this solution is
            widely used, so there are many support tools. In addition, we find
            this to be the most effective, intuitive and minimalistic method for
            vehicle information identification.
          </Text>
        </ScrollView>
      );
    } else if (service.id.localeCompare("3") === 0) {
      console.log("alo");
      return (
        <View>
          <Text style={styles.title}>List Dormitory History In-Out </Text>
          <ListDormitoryHistory />
        </View>
      );
    }
  };
  return <View>{renderServices()}</View>;
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 20,
    fontSize: 20,
    textAlign: "center",
    color: Color.red,
  },
  textCanteenTitle: {
    marginVertical: 20,
    textAlign: "center",
    color: Color.primary,
    fontSize: 20,
  },
  wrapperCanteen: {
    paddingHorizontal: 20,
  },
  textCanteen: {
    fontSize: 16,
    paddingVertical: 20,
  },
});

ServiceDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("service").name,
  };
};
