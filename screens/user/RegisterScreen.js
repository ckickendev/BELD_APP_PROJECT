import React, { useCallback, useReducer, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import Input from "../../components/UI/Input";
import { LinearGradient } from "expo-linear-gradient";
import * as AuthAction from "../../store/actions/auth";
import { useDispatch } from "react-redux";
import { useState } from "react/cjs/react.development";
import { TouchableOpacity } from "react-native-gesture-handler";
import Color from "../../constants/Color";

const FORM_INPUT_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type == FORM_INPUT_UPDATE) {
    const updateValues = {
      ...state.inputValue,
      [action.input]: action.value,
    };
    const updateValidities = {
      ...state.inputIdentifer,
      [action.input]: action.isValid,
    };
    let updateFormIsValid = true;
    for (const key in updateValidities) {
      updateFormIsValid = updateFormIsValid && updateValidities[key];
    }
    return {
      ...state,
      formIsValid: updateFormIsValid,
      inputValue: updateValues,
      inputValidinities: updateValidities,
    };
  }
  return state;
};

export default function AuthScreen(props) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState();
  const authHandler = async () => {
    let action;
    action = AuthAction.signup(
      formState.inputValue.email,
      formState.inputValue.password,
      formState.inputValue.mssv,
      formState.inputValue.fullname
    );
    setError(null);
    setIsLoaded(true);
    try {
      await dispatch(action);
      await console.log("Action shop");
      await props.navigation.navigate("Shop");
    } catch (err) {
      setError(err.message);
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Something went wrong", error, [{ text: "Okay!" }]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValue: {
      mssv: "",
      fullname: "",
      email: "",
      password: "",
      repassword: "",
    },
    inputValidinities: {
      mssv: false,
      fullname: false,
      email: false,
      password: false,
      repassword: false,
    },
    formIsValid: false,
  });
  return (
    <KeyboardAvoidingView style={styles.screen}>
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <View style={styles.ScrollView}>
          <ScrollView>
            <Input
              clearButtonMode="always"
              id="mssv"
              label="Enter IDS"
              keyboardType="default"
              placeholder="Enter your student ID"
              required
              autoCapitalize="none"
              errorText="Please enter your student Id!"
              onInputChange={inputChangeHandler}
              initialValue=""
              style={styles.styleInputAuth}
            />
            <Input
              clearButtonMode="always"
              id="fullname"
              fullname
              label="Enter fullname"
              keyboardType="default"
              placeholder="Enter your fullname"
              required
              // fullname
              autoCapitalize="none"
              errorText="Please enter a valid fullname!"
              onInputChange={inputChangeHandler}
              initialValue=""
              style={styles.styleInputAuth}
            />
            <Input
              clearButtonMode="always"
              id="email"
              label="Enter email"
              keyboardType="email-address"
              placeholder="Enter your email: (FPTmail)"
              required
              email
              autoCapitalize="none"
              errorText="Enter FPT email !"
              onInputChange={inputChangeHandler}
              initialValue=""
              style={styles.styleInputAuth}
            />
            <Input
              clearButtonMode="always"
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              // passwordRegex
              required
              minLength={6}
              maxLength={10}
              autoCapitalize="none"
              placeholder="Password"
              errorText="Please enter a valid password!"
              onInputChange={inputChangeHandler}
              initialValue=""
              style={styles.styleInputAuth}
            />
            <Input
              clearButtonMode="always"
              id="repassword"
              label="RePassword"
              keyboardType="default"
              secureTextEntry
              // passwordRegex
              required
              repassword
              password={formState.inputValue.password}
              minLength={6}
              maxLength={10}
              autoCapitalize="none"
              placeholder="Re-Password"
              errorText="Please enter a valid password!"
              onInputChange={inputChangeHandler}
              initialValue=""
              style={styles.styleInputAuth}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                title="REGISTER"
                color={Color.orangeFPT}
                onPress={authHandler}
                style={styles.buttonLogin}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Register</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

AuthScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Register",
    backgroundColor: Color.orangeFPT
  };
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  ScrollView: {
    textAlign: "center",
    width: "80%",
    justifyContent: "center",
    padding: 20,
  },
  gradient: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    marginTop: 10,
  },
  styleInputAuth: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 30,
    marginVertical: 10,
  },
  buttonLogin: {
    marginTop: 20,
    backgroundColor: Color.orangeFPT,
    width: "100%",
    height: 60,
    borderRadius: 25,
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
