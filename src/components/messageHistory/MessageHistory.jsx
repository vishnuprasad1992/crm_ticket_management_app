import "./message.css";
import { useSelector } from "react-redux";
const MessageHistory = ({ ticket }) => {
    const { singleTicket } = useSelector(state => state.tickets);
    return (
        <>
            {singleTicket.conversation ? singleTicket.conversation.map((history,i) =>
                <div key={i} className="message-history my-3">
                    <div className="send">
                        <div className="sender"><h6> {history.messageBy} </h6> </div>
                        <div className="date">{history.date && new Date(history.date).toLocaleString()}</div>
                    </div>
                    <div className="message mx-2 p-2"> {history.message} </div>
                </div>
            ) : null }
        </>
    )
}

export default MessageHistory
