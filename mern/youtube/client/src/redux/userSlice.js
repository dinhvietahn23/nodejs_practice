import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    isLoading: false,
    error: false
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        loginStart:(state) => {
            state.isLoading = true
        },
        loginSuccess: (state, action) => {
            state.isLoading = false
            state.currentUser = action.payload
        },
        loginFailure:(state) => {
            state.isLoading = false
            state.error = true

        },
        logout:(state) => {
            state.currentUser = null;
            state.isLoading = false;
            state.error = false;
        },
        subscription:(state, action) => {
            if(state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(
                    state.currentUser.subscribedUsers.findIndex(
                        (chanelId) => chanelId === action.payload
                    ),
                    1
                )
            } else {
                state.currentUser.subscribedUsers.push(action.payload)
            }
        }
    }
})

export const {loginStart, loginSuccess, loginFailure, logout, subscription} = userSlice.actions

export default userSlice.reducer