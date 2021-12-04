import React, { useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id, textChangeHandler]);

  const textChangeHandler = (text) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\D]).(?=\S+$).{8,20}$/;
    const fullnameRegex =
      /^[A-ZĐÂẤOỎÝ]([^!@#$%^&*( )_0-9A-Z,.;'+]{0,})( [A-ZĐÂẤOỎÝ]([^!@#$%^&*( )_0-9A-Z,.;'+]{0,})){0,}$/;
    const emailRegex = /^[a-z]{3,15}d[e,s,a]{1}1[3-7]0\d{3}@fpt.edu.vn$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.passwordRegex && !passwordRegex.test(text)) {
      isValid = false;
    }
    if (props.fullname && !fullnameRegex.test(text)) {
      isValid = false;
    }
    if (props.repassword && text.localeCompare(props.password) != 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={{ ...styles.formControl }}>
      {/* <Text style={styles.label}>{props.label}</Text> */}
      <TextInput
        {...props}
        style={{ ...styles.input, ...props.style }}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    // padding: 30,
    // borderBottomColor: "#ccc",
    // borderBottomWidth: 1,
    borderRadius: 25,
    fontSize: 16,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
  },
});

export default Input;
