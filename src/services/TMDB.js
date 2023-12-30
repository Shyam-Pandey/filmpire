import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;

export const tmbdApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) => ({

        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`
        }),
        //*Get Movies by [Type] API : https://api.themoviedb.org/3/genre/movie/list
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {
                // if (!searchQuery && !genreIdOrCategoryName) throw new Error('No Category or Query Provided');
                if (searchQuery) {
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
                }

                //*Get Movies by Category
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }

                //* Get Movies by Genre - popular. top_rated, upcoming
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                }

                //* Get Popular Movies
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            }
        }),
        getMovie: builder.query({
            query: (id) => `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
        })
    })
})

export const {
    useGetGenresQuery,
    useGetMoviesQuery,
    useGetMovieQuery,
} = tmbdApi;