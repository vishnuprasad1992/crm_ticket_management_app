import { Redirect, Route } from "react-router";
import DefaultLayout from "../Layouts/DefaultLayout";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { loginSuccess } from "../login/loginSlice";
import { useDispatch } from "react-redux";
import { fetchAccessToken } from '../../api/user';
import { getUserDetails } from "../pages/entry/dashboard/userAction";

const PrivateRoute = ({ children, ...rest }) => {
    const dispatch = useDispatch()

    const {isAuth} = useSelector(state => state.login);
    const {user} = useSelector(state => state.user)

    useEffect(() => {
        const fetchAccess = async () => {
            const result = await fetchAccessToken();
            result && dispatch(loginSuccess());
        }
        !user._id && dispatch(getUserDetails())
        !sessionStorage.getItem("accessToken") && localStorage.getItem("refreshToken") && fetchAccess()
        const token = sessionStorage.getItem("accessToken")
        if (token) {
            !isAuth && dispatch(loginSuccess())
        }
    }, [dispatch,isAuth,user._id])
    return (
        <Route
            {...rest}
            render={() =>
                isAuth ? <DefaultLayout>{children}</DefaultLayout> : <Redirect to={{ pathname: "/" }} />
            } />
    )
}

export default PrivateRoute;
