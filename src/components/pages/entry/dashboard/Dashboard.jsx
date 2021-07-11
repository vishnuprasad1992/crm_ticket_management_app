import "./dashboard.css"
import TicketTable from "./TicketTable";
import BreadCrumbs from "../../../breadcrumbs/BreadCrumbs";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { ticketAction } from "../../ticketlists/ticketAction";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { tickets } = useSelector ( state => state.tickets)
    useEffect(()=>{
        if(!tickets.length){
            dispatch(ticketAction())
        }
    },[tickets,dispatch])

    const totalTickets = tickets.length;
    const closedTickets = tickets.filter(ticket => ticket.status=== "closed");
    const pendingTickets = totalTickets - closedTickets.length

    return (
        <div className="container dashboard">
            <div className="row my-3" >
                <BreadCrumbs page="Dashboard" />
            </div>
            <div className="col-md-6 text-center col-lg-12 col-sm-12">
            <Link to="/add-tickets">
                <button className="btn btn-primary"> Add Tickets</button>
            </Link>
            </div>
            <div className="row my-3">
                <span className="text-center">Total Tickets :{totalTickets}</span>
            </div>
            <div className="row my-3">
                <span className="text-center">Total pending:{pendingTickets}</span>
            </div>
            <div className="row my-3">
                <h4 className="mb-4 text-warning" >Recently Added Tickets</h4>
                <TicketTable />
            </div>
            {!tickets.length &&
            <div className="row my-3">
                <h6 className="mb-4 text-center text-danger" >No data found</h6>
            </div>
            }
        </div>
    )
}

export default Dashboard
