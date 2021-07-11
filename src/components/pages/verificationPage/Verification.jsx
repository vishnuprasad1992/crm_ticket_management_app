import './verification.css';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router';
import { userVerify } from '../../../api/user';
import { Link } from 'react-router-dom';



const Verification = () => {
    const {id,email} = useParams();
    const [verifyDetails,setVerifyDetails] = useState({
        status:'',
        message:''
    })

    useEffect(()=>{
        const verify =async ()=>{
           const res = await userVerify(id,email)
           if(res.status){
               setVerifyDetails(res)
           }
        }
        verify()
    },[id,email])
    
    return (
        <div className="bg-info">
            <div className="container verification-page">
                <div className="bg-light px-3 col-lg-6 col-sm-12 my-5 verification-border-style">
                    <h5 className="text-center text-success ">{verifyDetails.message}</h5>
                   {verifyDetails.status==="success" && <h6 className="text-center">click here to < Link to="/" >Login</Link></h6>}
                </div>
            </div>
        </div> 
    )
}

export default Verification
