import { combineReducers } from 'redux';
import moviesReducer from './features/Movies/moviesSlice';

const rootReducer = combineReducers({
  movies: moviesReducer
});
  
export default rootReducer;
