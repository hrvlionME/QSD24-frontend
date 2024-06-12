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
    role: string,
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
<<<<<<< HEAD
            state.role = action.payload.role;
            state.loggedIn = true;
=======
            state.loggedIn = action.payload.id !== 0;
            state.role = action.payload.role;
>>>>>>> 6a305ca938b714eb794325c3c719a6b964a2ac08
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
            state.role = "0";
        },
        updateToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export const { login, logout, updateToken } = userSlice.actions;

export default userSlice.reducer;
