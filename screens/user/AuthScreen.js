import React, { useCallback, useReducer, useEffect } from "react";
import {
  Alert,
  Image,
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
    action = AuthAction.login(
      formState.inputValue.email,
      formState.inputValue.password
    );
    setError(null);
    setIsLoaded(true);
    try {
      await dispatch(action);
      await props.navigation.navigate("Main");
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
      email: "",
      password: "",
    },
    inputValidinities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });
  return (
    <KeyboardAvoidingView style={styles.screen}>
      <LinearGradient colors={["#fff", "#fff"]} style={styles.gradient}>
        <Image
          style={styles.stretch}
          source={require("../../assets/image/logoBeld2.png")}
        />
        <View style={styles.ScrollView}>
          <ScrollView>
            <Input
              id="email"
              label="Enter email"
              keyboardType="email-address"
              placeholder="Enter your email: (FPTmail)"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address!"
              onInputChange={inputChangeHandler}
              initialValue=""
              style={styles.styleInputAuth}
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              maxLength={10}
              autoCapitalize="none"
              placeholder="Password"
              errorText="Please enter a valid password!"
              onInputChange={inputChangeHandler}
              initialValue=""
              style={styles.styleInputAuth}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                title="LOGIN"
                color={Color.orangeFPT}
                onPress={authHandler}
                style={styles.buttonLogin}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Log in</Text>
              </TouchableOpacity>

              <TouchableOpacity
                title="LOGIN"
                color={Color.orangeFPT}
                onPress={() => {
                  props.navigation.navigate("AppBELD");
                }}
                style={styles.buttonLogin}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Guest</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={{ alignItems: "center", marginTop: 10 }}>
                <Text style={{ color: "#444" }}>
                  Have Trouble Logging In ?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Register");
                }}
                style={{ alignItems: "center", marginTop: 10 }}
              >
                <Text style={{ color: "#444" }}>Sign Up</Text>
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
    headerTitle: "Authentication",
    headerShown: false,
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
  stretch: {
    width: "100%",
    height: 100,
    marginBottom: -30,
  },
});
