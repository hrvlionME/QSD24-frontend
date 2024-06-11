import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: number;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    token: string;
    loggedIn: boolean;
    role: string,
}

const initialState: UserState = {
    id: 0,
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    token: '',
    loggedIn: false,
    role: "0",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ id: number; first_name: string; last_name: string; password: string; email: string; token: string, role: string }>) => {
            state.id = action.payload.id;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.password = action.payload.password;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.loggedIn = action.payload.id !== 0;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.id = 0;
            state.first_name = '';
            state.last_name = '';
            state.password = '';
            state.email = '';
            state.token = '';
            state.loggedIn = false;
            state.role = "0";
        },
        updateToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export const { login, logout, updateToken } = userSlice.actions;

export default userSlice.reducer;
