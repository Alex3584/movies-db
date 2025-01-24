import { client } from "../../api/tmdb";
import { ActionWithPayload, createReducer } from "../../redux/utils";
import { AppThunk } from "../../store";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  image?: string;
}

interface MoviesState {
  loading: boolean;
  top: Movie[];
}

const initialState: MoviesState = {
  loading: false,
  top: [],
};

function loading() {
  return {
    type: "movies/loading",
  };
}

function loaded(movies: Movie[]) {
  return {
    type: "movies/loaded",
    payload: movies,
  };
}

// export type AppThunk<ReturnType> = ThunkAction<ReturnType, MoviesState, undefined, UnknownAction>;

export function fetchMovies(): AppThunk<Promise<void>> {
  return async (dispatch, getState) => {
    dispatch(loading());

    const configuration = await client.getConfiguration(); // todo: single load per app
    const results = await client.getNowPlaying();
    const imageSize = "w780";
    const movies: Movie[] = results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      popularity: movie.popularity,
      image: movie.backdrop_path
        ? `${configuration.images.base_url}${imageSize}${movie.backdrop_path}`
        : undefined,
    }));

    dispatch(loaded(movies));
  };
}

const moviesReducer = createReducer<MoviesState>(initialState, {
  "movies/loading": (state, action: ActionWithPayload<boolean>) => {
    return { ...state, loading: true };
  },
  "movies/loaded": (state, action: ActionWithPayload<Movie[]>) => {
    return { ...state, loading: false, top: action.payload };
  },
});

export default moviesReducer;