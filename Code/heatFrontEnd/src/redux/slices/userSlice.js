// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    major: '',
    staff: false,
    entryYear: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.major = action.payload.major;
            state.staff = action.payload.staff;
            state.entryYear = action.payload.entryYear;
        },
        resetUser: state => initialState,
    },
});

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
