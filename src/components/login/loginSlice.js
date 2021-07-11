import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name:"login",
    initialState:{
        isAuth:false,
        isLoading : false,
        error:'',
    },
    reducers:{
        loginPending:state=>{
            state.isLoading = true;
            state.isAuth = false;
            state.error = '';
        },
        loginSuccess:(state)=>{
            state.isLoading = false;
            state.isAuth = true;
            state.error=''
        },
        loginFail:(state,action)=>{
            state.isLoading = false;
            state.isAuth = false;
            state.error = action.payload;
        }
    }
})
const {reducer,actions} = loginSlice;
export const { loginFail,loginPending,loginSuccess } = actions;
export default reducer;