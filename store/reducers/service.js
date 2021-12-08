import {
  SET_LIST_CANTEEN,
  SET_LIST_DORMITORY_HISTORY,
} from "../actions/service";

const initialState = {
  listCanteens: [],
  listDorHistory: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_CANTEEN: {
      return {
        ...state,
        listCanteens: action.listCanteens,
      };
    }
    case SET_LIST_DORMITORY_HISTORY: {
      return {
        ...state,
        listDorHistory: action.listDorHistory,
      };
    }
    default: {
      return state;
    }
  }
};
