import {
  DELETE_CLIENT_ACTION,
  FAIL_REQUEST_ACTION,
  FETCH_CLIENTS_ACTION,
  GET_SINGLE_CLIENT_ACTION,
  MAKE_REQUEST_ACTION,
  UPDATE_CLIENT_ACTION,
} from "../actionTypes";

const initialState = {
  clients: [],
  client: {},
  errMessage: "",
  isLoading: true,
};

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST_ACTION:
      return {
        ...state,
        isLoading: true,
      };

    case FAIL_REQUEST_ACTION:
      return {
        ...state,
        errMessage: action.payload,
        isLoading: false,
      };

    case FETCH_CLIENTS_ACTION:
      return {
        ...state,
        clients: action.payload,
        errMessage: "",
        isLoading: false,
      };

    case DELETE_CLIENT_ACTION:
      return {
        ...state,
        isLoading: false,
      };

    case GET_SINGLE_CLIENT_ACTION:
      return {
        ...state,
        client: action.payload,
        isLoading: false,
      };

    case UPDATE_CLIENT_ACTION:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
