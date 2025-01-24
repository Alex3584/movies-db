import { UnknownAction, applyMiddleware, createStore } from "redux";

import rootReducer from "./reducer";

import { ThunkAction, thunk } from "redux-thunk";

import { composeWithDevTools } from "@redux-devtools/extension";

function configureStore() {
  // const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
  return store;
  }

const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType> = ThunkAction<
  ReturnType,
  RootState,
  undefined,
  UnknownAction
>;

export default store;
