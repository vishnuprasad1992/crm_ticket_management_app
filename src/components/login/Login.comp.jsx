import './login.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserDetails } from "../../api/user";
import { loginFail, loginPending, loginSuccess } from "./loginSlice";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserDetails } from '../pages/entry/dashboard/userAction';
import { Link } from 'react-router-dom';


const Login = ({ setFormLoad }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const { isLoading,isAuth, error } = useSelector(state => state.login);
    useEffect(() => {
        if (sessionStorage.getItem("accessToken")) {
            history.push("/dashboard")
        }
    }, [history,isAuth])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("please fill the form")
        }
        dispatch(loginPending());
        const loginUser = { email, password };
        try {
            const logUserInfo = await loginUserDetails(loginUser);
            if (logUserInfo.data.status === "success") {
                dispatch(loginSuccess());
                dispatch(getUserDetails())

                history.push("/Dashboard")
                localStorage.setItem("refreshToken", logUserInfo.data.refreshToken);
                sessionStorage.setItem("accessToken", logUserInfo.data.accessToken);
            }
        } catch (error) {
            dispatch(loginFail(error.message));
        }
    }
    return (
        <div className="bg-light px-3 col-lg-6 col-sm-12  m-3 border-style">
            <div className="row">
                <h1 className="text-info text-center mb-5">Client Login</h1>
            </div>
            <form onSubmit={handleSubmit} >
                {error && <div className="alert alert-danger">
                    <span> {error} </span>
                </div>}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="form-control" id="password" />
                </div>

                <button type="submit" className="btn mb-3 btn-primary">Submit</button>
                {isLoading && <i className="fas fa-spinner text-center ms-2  text-info fa-2x fa-spin"></i>}
                <div className="mb-3" >
                    <a href="#!" onClick={() => setFormLoad("reset")}>Forget Password</a>
                </div>
                <div className="mb-3" >
                    <span>Are You a new user ? </span>
                    <Link to='/registration'>register here</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
