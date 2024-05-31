import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: number;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    token: string;
    loggedIn: boolean;
}

const initialState: UserState = {
    id: 0,
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    token: '',
    loggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ id: number; first_name: string; last_name: string; password: string; email: string; token: string }>) => {
            state.id = action.payload.id;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.password = action.payload.password;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.loggedIn = true;
        },
        logout: (state) => {
            state.id = 0;
            state.first_name = '';
            state.last_name = '';
            state.password = '';
            state.email = '';
            state.token = '';
            state.loggedIn = false;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;