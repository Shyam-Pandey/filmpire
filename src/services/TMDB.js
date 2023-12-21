import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;
const page = 3;
//https://api.themoviedb.org/3/movie/popular
// https://api.themoviedb.org/3/genre/movie/list

export const tmbdApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) => ({

        getGenres: builder.query({
            query: () => `genre/movie/list?page=${page}&api_key=${tmdbApiKey}`
        }),
        //*Get Movies by [Type]
        //https://api.themoviedb.org/3/genre/movie/list
        getMovies: builder.query({
            query: ({ genereIdOrCategoryName, page }) => {
                //*Get Movies by Category
                if (genereIdOrCategoryName && typeof genereIdOrCategoryName === 'string') {
                    return `movie/${genereIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }
                //*Get Movies by Genre
                if (genereIdOrCategoryName && typeof genereIdOrCategoryName === 'number') {
                    return `discover/movie/with_genre=${genereIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                }
                //*Get Movies by popular
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            }
        }),
    })
})

export const {
    useGetGenresQuery,
    useGetMoviesQuery,
} = tmbdApi;