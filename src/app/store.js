import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { tmbdApi } from "../services/TMDB";
import genreOrCategoryReducer from "../features/currentGenreOrCategory";
import userReducer from "../features/auth";

export default configureStore({
    reducer: {
        [tmbdApi.reducerPath]: tmbdApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware().concat(tmbdApi.middleware)),
})