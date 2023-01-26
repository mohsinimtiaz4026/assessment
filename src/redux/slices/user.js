import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading:false,
    error:null,
    currentUser:{
        id:'',
        fullname:'',
        username:'',
        email:'',
    }
}

const slice = createSlice({
    name:'user',
    initialState,
    reducers:{
        startLoading(state){
            state.isLoading = true
        },
        stopLoading(state){
            state.isLoading = false
        },
        hasError(state, action){
            state.isLoading = false
            state.error = action.payload
        },
        setCurrentUser(state, action){
            state.currentUser.id = action.payload.id
            state.currentUser.fullname = action.payload.fullname
            state.currentUser.username = action.payload.username
            state.currentUser.email = action.payload.email
        },
        removeCurrentUser(state){
            state.currentUser = {}
        },
    }
})

export default slice.reducer;

const actions = slice.actions;

export const registerUser = (user) => async(dispatch) => {
    dispatch(actions.startLoading())
    try {
        const response = await axios.post(`http://localhost:8000/users/registerUser`, user);
        console.log(response.data.data)
        dispatch(actions.setCurrentUser(response.data.data))
        dispatch(actions.stopLoading())
    } catch (error) {
        dispatch(actions.startLoading())
        dispatch(actions.hasError(error))
        throw error
    }
}

export const loginUser = (user) => async(dispatch) => {
    dispatch(actions.startLoading())
    try {
        const response = await axios.post(`http://localhost:8000/users/loginUser`, user);
        dispatch(actions.setCurrentUser(response.data.data))
        dispatch(actions.stopLoading())
    } catch (error) {
        dispatch(actions.startLoading())
        dispatch(actions.hasError(error))
        throw error
    }
}

export const logoutUser = (user) => async(dispatch) => {
    dispatch(actions.startLoading())
    try {
        dispatch(actions.removeCurrentUser())
        dispatch(actions.stopLoading())
    } catch (error) {
        dispatch(actions.startLoading())
        dispatch(actions.hasError(error))
        throw error
    }
}

export const getIsUserLoading = (state) => state.user.isLoading

export const getUserError = (state) => state.user.error
