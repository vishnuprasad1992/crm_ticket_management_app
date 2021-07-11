import BreadCrumbs from "../../breadcrumbs/BreadCrumbs";
import MessageHistory from "../../messageHistory/MessageHistory";
import ReplyText from "../../replyMessage/ReplyText";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SingleTicketAction, closeTicketAction } from "../ticketlists/ticketAction";


const TicketDetails = (props) => {
    const dispatch = useDispatch();
    const { isLoading, replymsg, error, singleTicket } = useSelector(state => state.tickets)
    const { id } = useParams();


    useEffect(() => {
        dispatch(SingleTicketAction(id));
    }, [id, dispatch])


    return (
        <div className="container mb-5">
            <div className="row mt-4" >
                <BreadCrumbs page="Add New Ticket" />
            </div>
            <hr className="my-3" />
            <div className="row mt-4" >
                {isLoading && <i className="fas fa-spinner text-center fa-2x fa-spin"></i>}
            </div>
            <div className="row mt-4" >
                {error ? <h6 className="alert alert-danger"> {error} </h6> :
                    replymsg && <h6 className="alert alert-success"> {replymsg} </h6>
                }
            </div>
            <div className="row">
                <div className="col-md-7 col-lg-9 col-sm-12">
                    <div className="row">
                        <span> Subject : {singleTicket.subject} </span>
                    </div>
                    <div className="row">
                        <span> Date :  {singleTicket.openedDate && new Date(singleTicket.openedDate).toLocaleString()}</span>
                    </div>
                    <div className="row">
                        <span> Status : {singleTicket.status} </span>
                    </div>
                </div>
                <div className="col-md-5 col-sm-12 col-lg-3 d-flex justify-content-end">
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => dispatch(closeTicketAction(id))}
                        disabled={singleTicket.status === "closed"}
                    >
                        Close Ticket
                    </button>
                </div>
            </div>
            <hr className="my-3 " />
            <h6>Message History</h6>
            <MessageHistory />
            <ReplyText id={id} />
            <br />

        </div>
    )
}

export default TicketDetails
