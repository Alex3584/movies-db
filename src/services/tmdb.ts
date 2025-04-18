import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import configuration from "../configuration";

export interface Configuration {
  images: {
    base_url: string;
  };
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  backdrop_path?: string | null;
  poster_path?: string | null;
  release_date?: string;
}

export interface MoviesState {
  results: MovieDetails[];
  lastPage: number;
  hasMorePages: boolean;
}

export interface MoviesFilters {
  keywords?: number[];
  genres?: number[];
}

export interface MoviesQuery {
  page: number;
  filters: MoviesFilters;
}

export interface KeywordItem {
  id: number;
  name: string;
}

export interface PageResponse<TResult> {
  page: number;
  results: TResult[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string | null;
}

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${configuration.apiUrl}/3`,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${configuration.apiToken}`);
    },
  }),

  endpoints: (builder) => ({
    // getConfiguration: builder.query<Configuration, void>({
    //   query: () => "/configuration",
    // }),

    getConfiguration: builder.query<Configuration, void>({
      query: () => "/configuration",
      transformResponse: (response: Configuration) => {
        if (response.images.base_url.startsWith("http://")) {
          response.images.base_url = response.images.base_url.replace("http://", "https://");
        }
        return response;
      },
    }),

    getMovies: builder.query<MoviesState, MoviesQuery>({
      query(moviesQuery) {
        const params = new URLSearchParams({
          page: moviesQuery.page.toString(),
        });

        if (moviesQuery.filters.keywords?.length) {
          params.append("with_keywords", moviesQuery.filters.keywords.join("|"));
        }

        if (moviesQuery.filters.genres?.length) {
          params.append("with_genres", moviesQuery.filters.genres.join(","));
        }

        const query = params.toString();
        const path = `/discover/movie?${query}`;

        return path;
      },
      transformResponse(response: PageResponse<MovieDetails>, _, arg) {
        return {
          results: response.results,
          lastPage: arg.page,
          hasMorePages: arg.page < response.total_pages,
        };
      },
      serializeQueryArgs({ endpointName }) {
        return endpointName;
      },
      merge(currentCacheData, responseData) {
        if (responseData.lastPage === 1) {
          currentCacheData.results = responseData.results;
        } else {
          currentCacheData.results.push(...responseData.results);
        }

        currentCacheData.hasMorePages = responseData.hasMorePages;
        currentCacheData.lastPage = responseData.lastPage;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getKeywords: builder.query<KeywordItem[], string>({
      query: (queryText) => `/search/keyword?query=${queryText}`,
      transformResponse: (response: PageResponse<KeywordItem>) => response.results,
    }),
    getGenres: builder.query<Genre[], void>({
      query: () => "/genre/movie/list",
      transformResponse: (response: { genres: Genre[] }) => response.genres,
    }),
    getMovieDetails: builder.query<MovieDetails, number>({
      query: (id) => `/movie/${id}`,
    }),
    getMovieCredits: builder.query<{ cast: CastMember[] }, number>({
      query: (id) => `/movie/${id}/credits`,
      transformResponse: (response: { cast: CastMember[] }) => ({
        cast: response.cast,
      }),
    }),
  }),
});

export const {
  useGetConfigurationQuery,
  useGetGenresQuery,
  useGetKeywordsQuery,
  useGetMoviesQuery,
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
} = tmdbApi;
