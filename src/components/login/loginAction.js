import { loginFail,loginPending,loginSuccess } from "./loginSlice";
import { loginUserDetails } from "../../api/user"
export const loginAction =  (loginData) => async (dispatch) => {
    dispatch(loginPending());
    try {
        const result = await loginUserDetails(loginData)
        if(!result) return dispatch(loginFail("something went wrong"));
        dispatch(loginSuccess())
    } catch(error) {
        dispatch(loginFail(error.message));
    }
}
