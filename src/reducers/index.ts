import { combineReducers } from "redux";
import moviesReducer from "./movies";

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export default rootReducer;
