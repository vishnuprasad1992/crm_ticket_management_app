import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const TicketTable = () => {
    const {searchTicketList,isLoading,error} = useSelector((state)=>state.tickets);
    if(isLoading){
        return <i className="fas fa-spinner text-center ms-2  text-info fa-2x fa-spin"></i>
    }
    if(error){
        return error
    }
    return (
        <table className="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Subjecct</th>
                    <th>Status</th>
                    <th>Opened Date</th>
                </tr>
            </thead>
            <tbody>
                {searchTicketList.length ? searchTicketList.map((row, i) => (
                    <tr key={i}>
                        <td>{row._id}</td>
                        <td>
                            <Link to={`/ticket/${row._id}`}>
                                {row.subject}
                            </Link>
                        </td>
                        <td>{row.status}</td>
                        <td>{row.openedDate && new Date(row.openedDate).toLocaleString()}</td>
                    </tr>
                )) : null
                }

            </tbody>
        </table>

    )
}

export default TicketTable
