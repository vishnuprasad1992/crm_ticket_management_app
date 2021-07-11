import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading :false,
    error : '',
    successMsg : ''
}

const addNewTicketSlice = createSlice({
    name : "add new ticket",
    initialState,
    reducers:{
        openTicketLoading : state =>{
            state.isLoading = true;
        },
        openTicketSuccess : (state,action) =>{
            state.isLoading = false;
            state.error ='';
            state.successMsg = action.payload;
        },
        openTicketFail : (state,action) =>{
            state.isLoading = false;
            state.error =action.payload;

        }
    }
})


const { reducer,actions } = addNewTicketSlice;

const { openTicketFail,openTicketLoading,openTicketSuccess } = actions;
export { openTicketFail,openTicketLoading,openTicketSuccess };
export default reducer;
