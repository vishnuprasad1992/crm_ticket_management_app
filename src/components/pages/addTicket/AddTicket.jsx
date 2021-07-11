import "./addTicket.css";
import BreadCrumbs from "../../breadcrumbs/BreadCrumbs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addNewTicketAction } from "./addNewTikcetAction"

const AddTicket = () => {
    const dispatch = useDispatch()
    const [subject, setSubject] = useState("");
    const [date, setDate] = useState("");
    const [details, setDetails] = useState("");
    const { user } = useSelector(state => state.user)
    const { isLoading, error, successMsg } = useSelector(state => state.addNewTicket)

    const { name } = user;

    const handleSubmit = (e) => {
        e.preventDefault();

        const ticketData = {
            subject,
            date,
            message: details,
            messageBy: name
        };

        dispatch(addNewTicketAction(ticketData))
        setDate("");
        setDetails("");
        setSubject("");
    }

    return (
        <div className="container">
            <div className="row mt-4" >
                <BreadCrumbs page="Add New Ticket" />
            </div>
            {isLoading && <div className="row mt-4"> <i className="fas fa-spinner text-center  fa-2x fa-spin"></i></div>}
            {error && <div className="alert row mt-4 text-center alert-danger"> <h6>{error}</h6> </div>}
            {successMsg && <div className="alert row mt-4 text-center alert-success"> <h6>{successMsg}</h6> </div>}
            <form onSubmit={handleSubmit} className="shadow col-lg-7 col-md-9 mx-auto my-3 bg-light py-5 px-4" >
                <h2 className="text-center text-info mb-5">ADD NEW TICKET</h2>
                <div className="row mb-3">
                    <label htmlFor="subject" className="col-sm-2 col-form-label">Subject</label>
                    <div className="col-sm-10 ">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Subject"
                            onChange={e => setSubject(e.target.value)}
                            minLength="5"
                            maxLength="150"
                            value={subject}
                            id="subject"
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="issue" className="col-sm-2 col-form-label">Issue Found at</label>
                    <div className="col-sm-10">
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Enter issue"
                            onChange={e => setDate(e.target.value)}
                            value={date}
                            id="issue"
                            required
                        />
                    </div>
                </div>
                <div className="row mb-5">
                    <label htmlFor="details" className="col-sm-2 col-form-label">Details</label>
                    <div className="col-sm-10">
                        <textarea
                            rows="5"
                            type="text"
                            className="form-control"
                            placeholder="Enter details"
                            minLength="5"
                            onChange={e => setDetails(e.target.value)}
                            value={details}
                            id="details"
                            required
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn-width btn btn-info"> <span className="text-size">Add New Tickets</span></button>
                </div>
            </form>
        </div>
    )
}

export default AddTicket;