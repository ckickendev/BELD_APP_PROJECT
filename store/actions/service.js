export const SET_LIST_CANTEEN = "SET_LIST_CANTEEN";
export const SET_LIST_DORMITORY_HISTORY = "SET_LIST_DORMITORY_HISTORY";
export const UPDATE_USER_ACOUNT_MONEY = "UPDATE_USER_ACOUNT_MONEY";

import { updateLocale } from "moment";
import { useDispatch } from "react-redux";
import { useState } from "react/cjs/react.development";
import Canteen from "../../models/canteen";
import DorHistory from "../../models/dormitoryHistory";
import User from "../../models/user";

export const fetchCanteen = () => {
  console.log("Fetch canteen ne");
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://beldproapp-default-rtdb.firebaseio.com/canteen.json"
      );
      if (!response.ok) {
        throw new Error("Some thing not good!");
      }
      const resData = await response.json();
      const loadedCanteen = [];
      console.log("resData", resData);
      for (const key in resData) {
        loadedCanteen.push(
          new Canteen(
            key,
            resData[key].image,
            resData[key].name,
            resData[key].count,
            resData[key].price,
            resData[key].open,
            resData[key].close
          )
        );
      }
      dispatch({
        type: SET_LIST_CANTEEN,
        listCanteens: loadedCanteen,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const fetchHistoryDormitory = () => {
  return async (dispatch, getState) => {
    const studentId = getState().auth.userLogin.studentId;
    try {
      const response = await fetch(
        "https://beldproapp-default-rtdb.firebaseio.com/dormitory.json"
      );
      if (!response.ok) {
        throw new Error("Some thing not good!");
      }
      const resData = await response.json();
      console.log("Fetch dor history ne", resData);

      const loadedDorHistory = [];
      for (const key in resData) {
        if (studentId.localeCompare(resData[key].studentId) === 0) {
          loadedDorHistory.push(
            new DorHistory(
              key,
              resData[key].studentId,
              resData[key].time,
              resData[key].type
            )
          );
        }
      }
      console.log("loadedDorHistory", loadedDorHistory);
      dispatch({
        type: SET_LIST_DORMITORY_HISTORY,
        listDorHistory: loadedDorHistory,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const createTopupRequest = async (amount, userId, token) => {
  const response = await fetch(
    `https://beldproapp-default-rtdb.firebaseio.com/histories.json?auth=${token}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        date: new Date().toISOString(),
        idFrom: "0",
        idTo: userId,
        name: "Topup",
        service: 0,
        status: 0,
        type: 0,
      }),
    }
  );
  const resData = await response.json();
  console.log(resData);
};

export const createTransferRequest = async (
  amount,
  userId,
  chooseIdNe,
  studentId,
  token,
  newAmountRecieve,
  newAmountSend
) => {
  const response = await fetch(
    `https://beldproapp-default-rtdb.firebaseio.com/histories.json?auth=${token}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        date: new Date().toISOString(),
        idFrom: userId,
        idTo: chooseIdNe,
        name: "Transfer money",
        service: 1,
        status: 1,
        type: 1,
      }),
    }
  );
  const resData = await response.json();
  console.log(resData);
  await updateSendAccount(userId, newAmountSend, token);
  await updateRecieve(chooseIdNe, newAmountRecieve, token);
};

const updateSendAccount = async (userId, newAmountSend, token) => {
  const response = await fetch(
    `https://beldproapp-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        balance: newAmountSend,
      }),
    }
  );
  const resData = await response.json();
  console.log("Send: ", resData);
};

export const updateAmount = (newAmountSend) => {
  return { type: UPDATE_USER_ACOUNT_MONEY, newMoney: newAmountSend };
};

const updateRecieve = async (chooseIdNe, newAmountRecieve, token) => {
  const response = await fetch(
    `https://beldproapp-default-rtdb.firebaseio.com/users/${chooseIdNe}.json?auth=${token}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        balance: newAmountRecieve,
      }),
    }
  );
  const resData = await response.json();
  console.log("Recieve: ", resData);
  
};
