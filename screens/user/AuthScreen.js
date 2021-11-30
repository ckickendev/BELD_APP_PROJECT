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
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import { LinearGradient } from "expo-linear-gradient";
import * as AuthAction from "../../store/actions/auth";
import { useDispatch } from "react-redux";
import { useState } from "react/cjs/react.development";

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
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState();
  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = AuthAction.signup(
        formState.inputValue.email,
        formState.inputValue.password
      );
    } else {
      action = AuthAction.login(
        formState.inputValue.email,
        formState.inputValue.password
      );
    }
    setError(null);
    setIsLoaded(true);
    try{
      await dispatch(action);
      props.navigation.navigate("Shop");
    }catch(err){
      setError(err.message);
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    if(error){
      Alert.alert("Something went wrong", error, [{text: "Okay!"}]);
    }
  }, [error])

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
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.ScrollView}>
          <ScrollView>
            <Input
              id="email"
              label="Email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address!"
              onInputChange={inputChangeHandler}
              initialValue=""
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
              errorText="Please enter a valid password!"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button
                title={isSignUp ? "Sign Up" : "Login"}
                color="red"
                onPress={authHandler}
              />
            </View>
            <View style={styles.buttonContainer}>
              {isLoaded ? (
                <ActivityIndicator size="small" color="blue" />
              ) : (
                <Button
                  title={`Switch to ${isSignUp ? "Login" : "Sign Up"}`}
                  color="yellow"
                  onPress={() => {
                    setIsSignUp((pre) => !pre);
                  }}
                />
              )}
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

AuthScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Authentication",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  ScrollView: {
    textAlign: "center",
    width: "80%",
    justifyContent: "center",
    maxWidth: 400,
    maxHeight: 400,
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
});
