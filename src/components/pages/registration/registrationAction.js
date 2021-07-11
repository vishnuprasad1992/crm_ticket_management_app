import { userRegistration } from '../../../api/user';
import { registerUserFail,registerUserLoading,registerUserSuccess } from './registrationSlice';

export const registrationAction = (data)=>async dispatch =>{
        try {
            dispatch(registerUserLoading())
            const result = await userRegistration(data);
            dispatch(registerUserSuccess(result.message))
        } catch (error) {
            dispatch(registerUserFail(error.message))
        }
}