import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:[],
    isLoading:false,
    error:''
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        getUserPending : state =>{
            state.isLoading = true;
        },
        getUserSuccess : (state,action) =>{
            state.user=action.payload;
            state.isLoading=false;
            state.error='';
        },
        getUserError : (state,action) =>{
            state.isLoading = false;
            state.error = action.payload
        },
    }
})


const { reducer,actions } = userSlice;
const { getUserError,getUserPending,getUserSuccess } = actions;

export { getUserError,getUserPending,getUserSuccess };
export default reducer; 