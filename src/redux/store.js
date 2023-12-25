import { combineReducers } from "redux";
import { clientReducer } from "./reducers/clientReducer";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import logger from "redux-logger";

const rootReducer = combineReducers({
  clientReducer: clientReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: () => [thunk, logger],
});

export default store;
