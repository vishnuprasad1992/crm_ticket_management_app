import './login.css';
const ResetPassword = ({setFormLoad,email,setEmail,handleResetSubmit}) => {
    return (
        <div className="bg-light px-3 col-lg-3 col-sm-12 col-md-12 border-style">
            <div className="row">
                <h1 className="text-info text-center mb-5">Reset Password</h1>
            </div>
            <form onSubmit= {handleResetSubmit} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" placeholder="Enter Email" value={email} onChange={(e) =>setEmail(e.target.value) } className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-primary" type="button">Reset Password</button>
                </div>
                <div className="mb-3" >
                <a href="#!" onClick={()=> setFormLoad("login") }>Login here</a>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword;
