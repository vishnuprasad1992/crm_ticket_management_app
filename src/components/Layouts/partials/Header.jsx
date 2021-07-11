import './css/header.css';
import {Link,useHistory} from "react-router-dom";
import { logout } from "../../../api/user"

const Header = () => {
    const history = useHistory();

    const logMeOut =  () =>{
        logout()
        sessionStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        history.push("/");
    }
    return (
        <header className="bg-info">
        <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container nav-flex">
                <Link className="navbar-brand brand-font" style={{color:"rgb(143, 238, 20)"}}  to="/dashboard">CRM</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="font-size navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link me-3" to="/ticket-list">Tickets</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger " onClick={logMeOut} >Logout</button>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    </header>
    )
}

export default Header
