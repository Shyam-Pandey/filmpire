import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { tmbdApi } from "../services/TMDB";
import genreOrCategoryReducer from "../features/currentGenreOrCategory";

export const store = configureStore({
    reducer: {
        [tmbdApi.reducerPath]: tmbdApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware().concat(tmbdApi.middleware)),
})

setupListeners(store.dispatch)