import './registration.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registrationAction } from './registrationAction';
import { useSelector } from 'react-redux';


const Registration = () => {
    const { isLoading, error, registrationMessage } = useSelector(state => state.registration)
    const initialState = {
        name: "vishnu",
        email: "prasad121992@gmail.com",
        mobile: "9874563210",
        company: "apple123",
        address: "sdfsdfsfsdf",
        password: "",
        cPassword: ""
    }
    const passwordErrorDefault = {
        isLengthy: false,
        isUpperCase: false,
        isLowerCase: false,
        isSymbols: false,
        isNumber: false,
        passwordCheck: false
    }
    const [newUser, setNewUser] = useState(initialState);
    const [passwordError, setPasswordError] = useState(passwordErrorDefault)
    const dispatch = useDispatch()
    const passwordHandler = (e) => {
        const { value } = e.target
        if (value !== '') {
            const isLengthy = value.length > 8;
            const isUpperCase = /[A-Z]/.test(value);
            const isLowerCase = /[a-z]/.test(value);
            const isNumber = /[0-9]/.test(value);
            const isSymbols = /[@,-,_]/.test(value);
            setPasswordError({ ...passwordError, isLengthy, isLowerCase, isUpperCase, isNumber, isSymbols });
            setNewUser({ ...newUser, password: value })
        }
    }
    const cPasswordHandler = (e) => {
        const { value } = e.target
        if (value === newUser.password) {
            setPasswordError({ ...passwordError, passwordCheck: true });
        }
        else {
            setPasswordError({ ...passwordError, passwordCheck: false });
            setNewUser({ ...newUser, cPassword: value })
        }
        setNewUser({ ...newUser, cPassword: '' })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { cPassword, ...others } = newUser;
            dispatch(registrationAction(others))
            setNewUser(initialState)
            setPasswordError(passwordErrorDefault)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="bg-info">
            <div className="container registeration-page">
                <div className="bg-light px-3 col-lg-6 col-sm-12 my-5 border-style">
                    <div className="row">
                        <h1 className="text-info text-center mb-5">User Registration</h1>
                    </div>
                    {error && <span className="text-danger text-center mb-3" >{error}</span>}
                    {registrationMessage && <span className="text-success text-center mb-3" >{registrationMessage}</span>}
                    <form onSubmit={handleSubmit} >
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} placeholder="Enter Your Name" className="form-control" id="name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} placeholder="Enter Email" className="form-control" id="email" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobile" className="form-label">Enter Mobile Number</label>
                            <input type="text" value={newUser.mobile} onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })} placeholder="Enter Mobile number" className="form-control" id="mobile" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="company" className="form-label">Enter Your Company</label>
                            <input type="text" value={newUser.company} onChange={(e) => setNewUser({ ...newUser, company: e.target.value })} placeholder="Enter your company" className="form-control" id="company" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Enter Your Address</label>
                            <input type="text" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} placeholder="Enter address" className="form-control" id="address" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" onChange={(e) => passwordHandler(e)} placeholder="Enter Password" value={newUser.password} className="form-control" id="password" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
                            <input type="password" onChange={(e) => cPasswordHandler(e)} placeholder="confirm Password" className="form-control" id="cpassword" />
                        </div>
                        {!passwordError.passwordCheck && <div className=""><span className="my-3 text-danger" >Password no match</span> </div>}
                        <ul>
                            <li><span className="text-danger"> minimum 8 characters  {passwordError.isLengthy && <i className="far fa-1x ms-1 text-success fa-check-circle"></i>} </span></li>
                            <li><span className="text-danger"> Must include Uppercase{passwordError.isUpperCase && <i className="far fa-1x text-success ms-1 fa-check-circle"></i>}</span></li>
                            <li><span className="text-danger"> Must include Lowercase {passwordError.isLowerCase && <i className="far fa-1x text-success ms-1 fa-check-circle"></i>}</span></li>
                            <li><span className="text-danger"> Must include number{passwordError.isNumber && <i className="far fa-1x text-success ms-1 fa-check-circle"></i>}</span></li>
                            <li><span className="text-danger"> Must include special characters {passwordError.isSymbols && <i className="far fa-1x text-success ms-1 fa-check-circle"></i>} </span></li>
                        </ul>

                        <button type="submit" className="btn mb-3 btn-primary" disabled={Object.values(passwordError).includes(false)} >Submit</button> {isLoading && <i className="fas fa-spinner text-center ms-2  text-info fa-2x fa-spin"></i>}
                        <div className="mb-3" >
                            <span>Allready Having an Account?</span>
                            <Link to='/' > Login Here!</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registration
