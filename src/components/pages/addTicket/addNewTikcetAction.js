import { openTicketFail, openTicketLoading, openTicketSuccess } from "./addTicketSlice";
import { addNewTicket } from "../../../api/ticket";



export const addNewTicketAction = (data) => async dispatch =>{
    dispatch(openTicketLoading());
    try {
        const result = await addNewTicket(data)
        if (result.status ==="error"){
            return dispatch(openTicketFail(result.message))
        }
        dispatch (openTicketSuccess(result.message))
    } catch (error) {
        dispatch(openTicketFail())
    }
}