import { Reducer, Action } from "redux";

interface Movie {
  id: number;
  title: string;
  popularity: number;
  overview: string;
}

interface MovieState {
  top: Movie[];
}

const initialState: MovieState = {
  top: [
    { id: 1, title: "Inception", popularity: 98, overview: "Dreams..." },
    { id: 2, title: "The Godfather", popularity: 98, overview: "Godfather..." },
    { id: 3, title: "The Dark Knight", popularity: 98, overview: "Batman..." },
    {
      id: 4,
      title: "The Godfather Part II",
      popularity: 98,
      overview: "Part II",
    },
  ],
};

const moviesReducer: Reducer<MovieState, Action> = (state, action) => {
  return initialState;
};

export default moviesReducer;
