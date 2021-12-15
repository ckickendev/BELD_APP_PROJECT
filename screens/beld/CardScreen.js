import React from "react";
import {
  Image,
  ImageBackground,
  ScrollViewComponent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import HeaderScreen from "../../components/mainscreen/HeaderScreen";
import PersonalInfo from "../../components/subScreens/PersonalInfo";
import CardDesign from "../../components/UI/CardDesign";
import CircleUser from "../../components/UI/CircleUser";
import Color from "../../constants/Color";

export default function CardScreen() {
  const userLogin = useSelector((state) => {
    if (!state.auth.userLogin.studentId) {
      return { studentId: "0" };
    }
    return state.auth.userLogin;
  });
  console.log("UserLogin: ", userLogin);
  return (
    <View style={styles.screen}>
      <HeaderScreen wallet style={{ paddingBottom: 20, height: 250 }} />
      <ScrollView style={styles.scollView}>
        {userLogin.studentId == undefined ? (
          ""
        ) : (
          <ImageBackground
            style={styles.stretch}
            source={require("../../assets/image/frontCard.png")}
          >
            {userLogin.studentId.localeCompare("DE150068") === 0 ? (
              <Image
                style={styles.imgcard}
                source={require("../../assets/image/DE150356.png")}
              />
            ) : (
              <Image
                style={styles.imgcard}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU",
                }}
              />
            )}

            <View style={styles.textStudentId}>
              <Text>{userLogin.studentId}</Text>
            </View>
            <View style={styles.textFullname}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: Color.primary,
                }}
              >
                {userLogin.fullname}
              </Text>
            </View>
            <Text style={styles.se}>Software Engineering</Text>
            <Text style={styles.year}>2019</Text>
            <Text style={styles.yeardate}>Oct, 2023</Text>
          </ImageBackground>
        )}

        <ImageBackground
          style={styles.stretch}
          source={require("../../assets/image/backCard.png")}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  stretch: {
    width: "100%",
    height: 230,
    resizeMode: "contain",
    marginBottom: 10,
    flexDirection: "row",
  },
  scollView: {
    height: 500,
  },
  imgcard: {
    backgroundColor: "red",
    marginLeft: 36,
    width: "28%",
    height: 160,
    marginTop: 20,
    marginBottom: 10,
  },
  textStudentId: {
    marginLeft: 80,
    marginTop: 28,
  },
  textFullname: {
    marginLeft: -80,
    marginTop: 50,
  },
  year: {
    marginLeft: 0,
    marginTop: 110,
    fontSize: 12,
  },
  yeardate: {
    marginLeft: -40,
    marginTop: 140,
    fontSize: 12,
  },
  se: {
    marginLeft: -130,
    marginTop: 82,
    fontSize: 8,
  },
});
