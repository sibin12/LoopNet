import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    user :null,
    token: null,
    toggle:true,
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        login: (state,action) =>{
            state.user = action.payload.others
            state.token = action.payload.token
        },
        register: (state,action) =>{
            state.user = action.payload.others
            state.token = action.payload.token
        },
        logout: (state) =>{
            state.user = null
            state.token = null
            localStorage.clear()
        },
        toggle:(state)=>{
            return {
                ...state,
                toggle: !state.toggle
            };
        }  
    }
})

export const {login, register, logout , toggle } = authSlice.actions

export default authSlice.reducer
