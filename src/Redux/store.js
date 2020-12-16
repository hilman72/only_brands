import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import { authReducer } from "./reducers";

//TM
import { userInfoUploadReducer } from './Reducers/TMreducers'
import logger from "redux-logger";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  authStore: authReducer,
  //TM
  userInfoUploadStore: userInfoUploadReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);
