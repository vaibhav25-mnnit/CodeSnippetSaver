import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUser: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInUser: (state) => {
            state.isUser = true;
        },
        signOutUser: (state) => {
            state.isUser = false;
        },
    },
});

export const { signInUser, signOutUser } = userSlice.actions;

export const selectIsUser = (state) => state.user.isUser;
export default userSlice.reducer;
