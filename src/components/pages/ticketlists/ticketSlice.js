import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
    name: "ticketList",
    initialState: {
        tickets: [],
        isLoading: false,
        error: false,
        searchTicketList: [],
        singleTicket: {},
        replymsg:''
    },
    reducers: {
        fetchTicketLoading: state => {
            state.isLoading = true;
        },
        fetchTicketSuccess: (state, action) => {
            state.isLoading = false;
            state.tickets = action.payload;
            state.searchTicketList = action.payload;
        },
        fetchTicketfail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        fetchSingleTicketLoading: state => {
            state.isLoading = true;
        },
        fetchSingleTicketSuccess: (state, action) => {
            state.isLoading = false;
            state.singleTicket = action.payload;
            state.error = '';
        },
        fetchSingleTicketfail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        replyTicketLoading: state => {
            state.isLoading = true;
        },
        replyTicketSuccess: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.replymsg = action.payload;
        },
        replyTicketfail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        closeTicketLoading: state => {
            state.isLoading = true;
        },
        closeTicketSuccess: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.replymsg = action.payload;
        },
        closeTicketfail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        fetchSearchTicket: (state, action) => {
            state.searchTicketList = state.tickets.filter(row => {
                if (!action.payload) return row;
                return row.subject.toLowerCase().includes(action.payload.toLowerCase())
            })
        },
    }
})
const { reducer, actions } = ticketSlice;
export const { fetchTicketLoading,
    fetchTicketSuccess,
    fetchTicketfail,
    fetchSearchTicket,
    fetchSingleTicketLoading,
    fetchSingleTicketSuccess,
    fetchSingleTicketfail,
    replyTicketLoading,
    replyTicketSuccess,
    replyTicketfail,
    closeTicketLoading,
    closeTicketSuccess,
    closeTicketfail
 } = actions;
export default reducer;