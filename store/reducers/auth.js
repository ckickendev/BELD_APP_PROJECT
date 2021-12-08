import {
  AUTHENTICATE,
  LOGOUT,
  USERLOGIN,
  SET_SERVICE,
  SET_HISTORY,
  SET_LIST_USER,
  SET_HISTORY_PARKING
} from "../actions/auth";
import { UPDATE_USER_ACOUNT_MONEY } from "../actions/service";

const initialState = {
  token: null,
  userId: null,
  userLogin: {},
  listService: [],
  listHistories: [],
  listUsers: [],
  listHistoriesParking: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE: {
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    }
    case USERLOGIN: {
      return {
        ...state, userLogin: action.userLogin
      }
    }
    case LOGOUT: {
      return initialState;
    }
    case SET_SERVICE:{
      return {
        ...state,
        listService: action.listService
      };
    }
    case SET_HISTORY: {
      return {
        ...state,
        listHistories: action.historyDatas,
      };
    }
    case SET_LIST_USER: {
      return {
        ...state,
        listUsers: action.listUsers,
      };
    }
    case SET_HISTORY_PARKING: {
      return {
        ...state,
        listHistoriesParking: action.historyDatas,
      };
    }
    case UPDATE_USER_ACOUNT_MONEY:{
      let newUser = { ...state.userLogin };
      newUser.balance = action.newMoney;
      return { ...state, userLogin: newUser };
    }
    default: {
      return state;
    }
  }
};
