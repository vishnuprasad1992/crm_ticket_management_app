import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: '',
    registrationMessage: ''
}

const registrationSlice = createSlice({
    name: "Registration",
    initialState,
    reducers: {
        registerUserLoading: state => {
            state.isLoading = true;
        },
        registerUserSuccess: (state, action) => {
            state.isLoading = false;
            state.registrationMessage = action.payload;
            state.error=''
        },
        registerUserFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.registrationMessage='';
        }
    }
})


const  { reducer,actions } = registrationSlice;

const { registerUserFail,registerUserLoading,registerUserSuccess } = actions;
export { registerUserFail,registerUserLoading,registerUserSuccess };

export default reducer