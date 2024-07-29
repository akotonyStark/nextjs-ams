import { createSlice } from "@reduxjs/toolkit"

type User = {
    email: string,
    password: string
    token?: string
}
type AuthState = {
    loggedInUser: User  | null,
    isAuthenticated: Boolean
}

const initialState: AuthState = {
    loggedInUser: null,
    isAuthenticated: false
}

const authSlice =  createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true
            state.loggedInUser = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem('auth') // deletes token from storage
            state.isAuthenticated = false
            state.loggedInUser = null
          },
    }
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer