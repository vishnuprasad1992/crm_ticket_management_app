import Login from "../../login/Login.comp";
import ResetPassword from "../../login/ResetPassword";
import './entry.page.css';
import { useState } from "react";

const Entry = () => {
 
    const [formLoad, setFormLoad] = useState("login")


    const handleResetSubmit = (e) => {
        e.preventDefault();
    }


    return (
        <div className="bg-info">
            <div className="container entryPage">
                {formLoad === "login" &&
                <Login />
                }
                {formLoad ==="reset" &&
                <ResetPassword 
                handleResetSubmit={handleResetSubmit}
                setFormLoad={setFormLoad}
                />
                }
            </div>
        </div>
    )
}

export default Entry;
