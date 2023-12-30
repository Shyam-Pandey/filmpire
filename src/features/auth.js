import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


const initialState = { //object with the next three properties
    user: {},
    isAuthenticated: false,
    sessionId: '',
}
export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.sessionId = localStorage.getItem('session_id');

            localStorage.setItem('account_id', action.payload.id);
        }
    },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
export const userSelector = (state) => state.user;
