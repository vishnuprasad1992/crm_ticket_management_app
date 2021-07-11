import BreadCrumbs from "../../breadcrumbs/BreadCrumbs";
import TicketTable from "../entry/dashboard/TicketTable"; 
import { useDispatch } from "react-redux";
import { ticketAction } from "./ticketAction";
import { useEffect } from "react";
import SearchTicket from "../../searchTicket/SearchTicket";
import { Link } from "react-router-dom"; 

const TicketLists = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ticketAction());
    }, [dispatch])

    const bStyle = "col-md-12 mx-auto my-3  py-5 px-4";

    //    const newSearchData =  data.filter(row => row.subject.toLowerCase().includes(str.toLowerCase()));
   
    return (
        <div className="container bg-light mt-3 mb-3 d-flex flex-column">
             <div className="row mt-4" >
                <BreadCrumbs page="Add New Ticket" />
            </div>
            <div className={`d-flex ${bStyle} justify-content-between`}>
                <Link to="/add-tickets" style={{width:"25%"}}>
                    <button type="submit" className="btn btn-info" > Add Ticket </button>
                </Link>
                <SearchTicket />
            </div>

            <TicketTable />
            
        </div>
    )
}

export default TicketLists
