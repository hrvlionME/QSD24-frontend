import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: string;
    username: string;
    password: string;
    email: string;
    token: string;
    loggedIn: boolean;
}

const initialState: UserState = {
    id: '',
    username: '',
    password: '',
    email: '',
    token: '',
    loggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ id: string; username: string; password: string; email: string; token: string }>) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.password = action.payload.password;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.loggedIn = true;
        },
        logout: (state) => {
            state.id = '';
            state.username = '';
            state.password = '';
            state.email = '';
            state.token = '';
            state.loggedIn = false;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;