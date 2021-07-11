import "./reply.css";
import { updateTicketAction } from "../pages/ticketlists/ticketAction";
import { useDispatch,useSelector } from "react-redux";
import { useState } from "react";



const ReplyText = ({id}) => {
    const dispatch = useDispatch();

    const {user} = useSelector(state =>state.user)
    const {singleTicket} = useSelector(state =>state.tickets)

    const [reply,setReply] = useState("");

    const handleReply =  async (e) =>{
        e.preventDefault();
        if (!reply){
           return alert("please enter some value");
        }
        const conversation = {
            message:reply,
            messageBy:user.name
        }
        await dispatch(updateTicketAction(id,conversation))
        setReply("")
    }

    return (
        <div className="reply-text">
            <form onSubmit={handleReply} className="form-group">
                <label htmlFor="reply" className="mb-3" > Reply </label>
                <textarea 
                    value={reply}
                    className="form-control"  
                    rows="5"
                    id="reply"
                    onChange = {e => setReply(e.target.value) }
                />
                <div className="text-end">
                    <button 
                    className="btn btn-primary mb-5 my-3"
                    disabled= {singleTicket.status=== "closed"}
                    >
                        Reply
                        </button>
                </div>
            </form>
        </div>
    )
}

export default ReplyText
