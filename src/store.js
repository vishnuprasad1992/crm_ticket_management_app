import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from './components/pages/ticketlists/ticketSlice';
import loginReducer from './components/login/loginSlice';
import userReducer from "./components/pages/entry/dashboard/userSlice";
import addNewTicketReducer from "./components/pages/addTicket/addTicketSlice";
import registrationreducer from "./components/pages/registration/registrationSlice";


const store = configureStore({
    reducer:{
        tickets: ticketReducer,
        login: loginReducer,
        user: userReducer,
        addNewTicket : addNewTicketReducer,
        registration : registrationreducer
    }
});

export default store;
