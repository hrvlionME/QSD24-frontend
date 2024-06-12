import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: number;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    token: string;
    role: string;
    loggedIn: boolean;
}

const initialState: UserState = {
    id: 0,
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    token: '',
    role:'',
    loggedIn: false,
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
            state.role = action.payload.role;
            state.loggedIn = true;
        },
        logout: (state) => {
            state.id = 0;
            state.first_name = '';
            state.last_name = '';
            state.password = '';
            state.email = '';
            state.token = '';
            state.role = '';
            state.loggedIn = false;
        },
        updateToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export const { login, logout, updateToken } = userSlice.actions;

export default userSlice.reducer;
