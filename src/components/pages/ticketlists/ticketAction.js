import {
    fetchTicketfail,
    fetchSearchTicket,
    fetchTicketLoading,
    fetchTicketSuccess,
    fetchSingleTicketLoading,
    fetchSingleTicketSuccess,
    fetchSingleTicketfail,
    replyTicketLoading,
    replyTicketSuccess,
    replyTicketfail,
    closeTicketLoading,
    closeTicketSuccess,
    closeTicketfail
} from "./ticketSlice";
import { getAllTickets, getSingleTicket, updateSingleTicket,closeSingleTicket } from "../../../api/ticket";

export const ticketAction = () => async (dispatch) => {
    dispatch(fetchTicketLoading());
    try {
        const result = await getAllTickets()
        result.data.length && dispatch(fetchTicketSuccess(result.data))
    } catch (error) {
        dispatch(fetchTicketfail(error.message));
    }
}
export const searchTickets = (searchString) => (dispatch) => {
    dispatch(fetchSearchTicket(searchString))
}


export const SingleTicketAction = (id) => async (dispatch) => {
    dispatch(fetchSingleTicketLoading());
    try {
        const result = await getSingleTicket(id)
        dispatch(fetchSingleTicketSuccess(result.data))
    } catch (error) {
        dispatch(fetchSingleTicketfail(error.message));
    }
}
export const updateTicketAction = (id, data) => async (dispatch) => {
    dispatch(replyTicketLoading());
    try {
        const result = await updateSingleTicket(id, data);
        if (result.status === "error") {
            return dispatch(replyTicketfail(result.message));
        }

        dispatch(SingleTicketAction(id))
        dispatch(replyTicketSuccess(result.message))
    } catch (error) {
        dispatch(replyTicketfail(error.message));
    }
}


export const closeTicketAction = (id) => async (dispatch) => {
    dispatch(closeTicketLoading());
    try {
        const result = await closeSingleTicket(id);
        if (result.status === "error") {
            return dispatch(closeTicketfail(result.message));
        }
        dispatch(SingleTicketAction(id))
        dispatch(closeTicketSuccess(result.message))
    } catch (error) {
        dispatch(closeTicketfail(error.message));
    }
}


