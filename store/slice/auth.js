import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token : "toke"
}

export const auth = createSlice({
    name: "authRedux",
    initialState,
    reducers: {
        setToken: (state , action) => {
            state.token = action.payload
        }
    } 
})

export const { setToken } =  auth.actions

export default auth.reducer