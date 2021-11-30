// export const SIGN_UP = "SIGN_UP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

import AsyncStorage from "@react-native-async-storage/async-storage";

export const authenticate = (userId, token, expiredTime) => {
  console.log("Token dang di vao authen ham: ", token);
  return (dispatch) => {
    dispatch(setLogoutTimer(expiredTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, password) => {
  return async (dispatchEvent) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBD94gqPPjQFxvsOnbWPQbwD-PCxkCattE",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      const errorID = errorData.error.message;
      let message = "Something went wrong!";
      if (errorID === "EMAIL_EXISTS") {
        message = "This email is exist ! ";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    // console.log(resData);
    dispatchEvent(
      authenticate(
        resData.localId,
        resData.token,
        parseInt(resData.expiresIn) * 1000
      )
    );
  };
};

export const logout = () => {
  console.log("logout ben auth");
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const login = (email, password) => {
  return async (dispatchEvent) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBD94gqPPjQFxvsOnbWPQbwD-PCxkCattE",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      const errorID = errorData.error.message;
      let message = "Something went wrong!";
      if (errorID === "EMAIL_NOT_FOUND") {
        message = "This email could not be found ! ";
      } else if (errorID === "INVALID_PASSWORD") {
        message = "This password not right !";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    // console.log(resData);
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    dispatchEvent(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiry: expirationDate.toISOString(),
    })
  );
};
