import { useDispatch } from "react-redux";
import { fetchSearchTicket } from "../pages/ticketlists/ticketSlice";


const SearchTicket = () => {

    const dispatch = useDispatch();

    const handleChange = (e)=>{
        const value = e.target.value;
        dispatch(fetchSearchTicket(value))
    }

    return (
        <form >
            <div className="form-group d-flex align-items-center">
                <label htmlFor="" className="px-3" > Search </label>
                <input
                    type="text"
                    placeholder="search items"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
        </form>
    )
}

export default SearchTicket
