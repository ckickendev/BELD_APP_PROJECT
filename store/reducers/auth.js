import { AUTHENTICATE, LOGOUT, USERLOGIN, SET_SERVICE, SET_HISTORY } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  userLogin: {},
  listService: [],
  listHistories: [],
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
      // console.log("authen token logout:", action.token);
      return initialState;
    }
    case SET_SERVICE:{
      // console.log("List Service in redux: ",action.listService);
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
    default: {
      return state;
    }
  }
};
