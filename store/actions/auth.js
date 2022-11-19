export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const USERLOGIN = "USERLOGIN";
export const SET_SERVICE = "SET_SERVICE";
export const SET_HISTORY = "SET_HISTORY";
export const SET_LIST_USER = "SET_LIST_USER";
export const SET_HISTORY_PARKING = "SET_HISTORY_PARKING";

import User from "../../models/user";
import Service from "../../models/service";

let timer;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import History from "../../models/history";

export const authenticate = (userId, token, expiredTime) => {
  // console.log("Token dang di vao authen ham: ", token);
  return (dispatch) => {
    dispatch(setLogoutTimer(expiredTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, password, mssv, fullname) => {
  return async (dispatchEvent) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGfoaZXknZIm52oE4y-ncL19lbY7gggLg",
      {
        method: "POST",
        mode: 'no-cors',
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
    dispatchEvent(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const registerDatabase = (email, password, mssv, fullname) => {
      return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        // console.log("In ra token choi: ", token);
        try {
          const response = await fetch(
            `https://beldproapp-default-rtdb.firebaseio.com/users.json?auth=${token}`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                idstudent: mssv,
                fullname,
                email,
                password,
                balance: 0,
                avatar:
                  "https://banner2.cleanpng.com/20180811/oy/kisspng-computer-icons-clip-art-user-profile-image-member-svg-png-icon-free-download-288552-onli-5b6f6bc83d0489.8542259415340287442499.jpg",
              }),
            }
          );
          const resData = await response.json();
        } catch (error) {
          throw error;
        }
      };
    };
    dispatchEvent(registerDatabase(email, password, mssv, fullname));
    dispatchEvent(logout());
    Alert.alert("System Message", "Your Account has signed, login now !", [
      {
        text: "Ok",
      },
      { text: "OK" },
    ]);
  };
};

export const logout = () => {
  // console.log("logout ben auth");
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
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGfoaZXknZIm52oE4y-ncL19lbY7gggLg",
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
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );

    dispatchEvent(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    dispatchEvent(
      setUserLogin(email, resData.idToken, resData.localId, expirationDate)
    );
  };
};

export const setUserLoginWithOnlyEmail = (email) => {
  return async (dispatchEvent) => {
    try {
      const response = await fetch(
        `https://beldproapp-default-rtdb.firebaseio.com/users.json`
      );
      const resData = await response.json();
      let userLogin = {};
      for (const key in resData) {
        if (resData[key].email.localeCompare(email) === 0) {
          userLogin = new User(
            key,
            resData[key].idstudent,
            resData[key].balance,
            resData[key].email,
            resData[key].fullname,
            resData[key].avatar
          );
        }
      }
      dispatchEvent(setUserClone(userLogin));
    } catch (err) {
      throw err;
    }
  };
};

export const setUserLogin = (email, idToken, localId, expirationDate) => {
  // const dispatch = useDispatch();
  return async (dispatchEvent) => {
    try {
      const response = await fetch(
        `https://beldproapp-default-rtdb.firebaseio.com/users.json`
      );
      const resData = await response.json();
      // console.log("resData", resData);
      let userLogin = {};
      for (const key in resData) {
        // console.log("resData[key], email" + resData[key].email, email);
        if (resData[key].email.localeCompare(email) === 0) {
          userLogin = new User(
            key,
            resData[key].idstudent,
            resData[key].balance,
            resData[key].email,
            resData[key].fullname,
            resData[key].avatar
          );
        }
      }
      saveDataToStorage(idToken, localId, expirationDate, email);
      dispatchEvent(setUserClone(userLogin));
    } catch (err) {
      throw err;
    }
  };
};

export const setUserClone = (userLogin) => {
  return (dispatch) => {
    dispatch({ type: USERLOGIN, userLogin: userLogin });
  };
};

const saveDataToStorage = (token, userId, expirationDate, email) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiry: expirationDate.toISOString(),
      email: email,
    })
  );
};

export const fetchService = () => {
  console.log("Fetch ne");
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://beldproapp-default-rtdb.firebaseio.com/services.json"
      );
      if (!response.ok) {
        throw new Error("Some thing not good!");
      }
      const resData = await response.json();
      const loadedServices = [];
      for (const key in resData) {
        loadedServices.push(
          new Service(
            key,
            resData[key].count,
            resData[key].img,
            resData[key].name,
            resData[key].price
          )
        );
      }
      dispatch({
        type: SET_SERVICE,
        listService: loadedServices,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const fetchHistory = () => {
  return async (dispatchEvent, getState) => {
    const userId = getState().auth.userLogin.id;
    try {
      const response = await fetch(
        `https://beldproapp-default-rtdb.firebaseio.com/histories.json`
      );

      const resData = await response.json();
      let historyDatas = [] ;
      for (const key in resData) {
        console.log("key", key);
        if (
          resData[key].idFrom.localeCompare(userId) === 0 ||
          resData[key].idTo.localeCompare(userId) === 0
        ) {
          historyDatas.push(
            new History(
              key,
              resData[key].idFrom,
              resData[key].idTo,
              resData[key].amount,
              resData[key].name,
              new Date().toISOString(),
              resData[key].type,
              resData[key].service,
              resData[key].status
            )
          );
          // console.log(historyDatas);
        } else{
          // console.log("alo2");
        }
      }
      await console.log("historyDatas", historyDatas);
      await dispatchEvent({ type: SET_HISTORY, historyDatas: historyDatas });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchHistoryParking = () => {
  return async (dispatchEvent, getState) => {
    const userId = getState().auth.userLogin.id;
    try {
      const response = await fetch(
        `https://beldproapp-default-rtdb.firebaseio.com/histories.json`
      );

      const resData = await response.json();
      const historyDatas = [];
      // console.log("resData", resData);

      for (const key in resData) {
        if (
          resData[key].idFrom.localeCompare(userId) === 0 ||
          resData[key].idTo.localeCompare(userId) === 0
        ) {
          historyDatas.push(
            new History(
              key,
              resData[key].idFrom,
              resData[key].idTo,
              resData[key].amount,
              resData[key].name,
              new Date().toISOString(),
              resData[key].type,
              resData[key].service,
              resData[key].status
            )
          );
        }
      }
      // console.log("historyDatas", historyDatas);
      dispatchEvent({ type: SET_HISTORY_PARKING, historyDatas: historyDatas });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchUsers = () => {
  console.log("Fetch User ne");
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://beldproapp-default-rtdb.firebaseio.com/users.json"
      );
      if (!response.ok) {
        throw new Error("Some thing not good!");
      }
      const resData = await response.json();
      const listUsers = [];
      for (const key in resData) {
        listUsers.push(
          new User(
            key,
            resData[key].idstudent,
            resData[key].balance,
            resData[key].email,
            resData[key].fullname,
            resData[key].avatar
          )
        );
      }
      // console.log("List user truoc khi set: ", listUsers);
      dispatch({
        type: SET_LIST_USER,
        listUsers: listUsers,
      });
    } catch (error) {
      throw error;
    }
  };
};
