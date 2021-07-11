import { getUserError,getUserPending,getUserSuccess } from "./userSlice";
import { getUser } from "../../../../api/user";


export const getUserDetails = () => async dispatch =>{
    dispatch(getUserPending());
    try {
        const user = await getUser();
        dispatch(getUserSuccess(user.data));
    } catch (error) {
    dispatch(getUserError(error.message))    
    }

}
