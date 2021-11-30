import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE: {
      console.log("authen token authen:", action.token);
      return {
        token: action.token,
        userId: action.userId,
      };
    }
    case LOGOUT: {
      console.log("authen token logout:", action.token);
      return initialState;
    }
    default: {
      return state;
    }
  }
};
