import React, { useCallback, useState, useEffect, useReducer } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import Input from '../../components/UI/Input'

import HeaderButton from "../../components/UI/HeaderButton";
import * as actionProduct from "../../store/actions/product";

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

export default function EditProductScreen(props) {
  const [isLoading, SetIsLoading] = useState(false);
  const [error, SetError] = useState();

  const userEditID = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((pro) => pro.id === userEditID)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValue: {
      title: editedProduct ? editedProduct.title : "",
      imageURL: editedProduct ? editedProduct.imageURL : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidinities: {
      title: editedProduct ? true : false,
      imageURL: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    SetIsLoading(true);
    if (!formState.formIsValid) {
      Alert.alert("Some field is blank", "Please check input again!", {
        text: "OKAY",
      });
      return;
    }
    if (editedProduct) {
      dispatch(
        actionProduct.updateProduct(
          editedProduct.id,
          formState.inputValue.title,
          formState.inputValue.imageURL,
          formState.inputValue.description
        )
      );
    } else {
      dispatch(
        actionProduct.createProduct(
          formState.inputValue.title,
          formState.inputValue.imageURL,
          +formState.inputValue.price,
          formState.inputValue.description
        )
      );
    }
    SetIsLoading(false);
    props.navigation.goBack();
  }, [dispatch, formState]);

  useEffect(() => {
    props.navigation.setParams({
      submit: submitHandler,
    });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      console.log(inputIdentifier, inputValue, inputValidity);
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    console.log("alo");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  return (
    <ScrollView style>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          errorText="Please enter a valid title!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ""}
          initiallyValid={!!editedProduct}
          required
        />
        <Input
          id="imageURL"
          label="Image Url"
          errorText="Please enter a valid image url!"
          keyboardType="default"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.imageURL : ""}
          initiallyValid={!!editedProduct}
          required
        />
        {editedProduct ? null : (
          <Input
            id="price"
            label="Price"
            errorText="Please enter a valid price!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            required
            min={0.1}
          />
        )}
        <Input
          id="description"
          label="Description"
          errorText="Please enter a valid description!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.description : ""}
          initiallyValid={!!editedProduct}
          required
          minLength={5}
        />
      </View>
    </ScrollView>
  );
}

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add new product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Save" iconName="md-checkmark" onPress={submitFn} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },
  fromGroup: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  fromTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  textInput: {
    color: "red",
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
  },
});
