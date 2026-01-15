
import { Link, useNavigate } from 'react-router-dom';
import './register.css'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { registerService } from '../../service/authService';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const fd = {"name": name,"email": email,"password": password};
        try {
           const data= await registerService(fd);
            console.log(data);
            toast.success("Registration completed.")
            navigate("/login");
        }
        catch (error) {
            console.log(error)
            toast.error("Unable to register");
        }
    }

    return (
        <div className=" register-container ">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign Up</h5>
                            <form onSubmit={(e) => onSubmitHandler(e)}>
                                <div className="form-floating mb-3">
                                    <input required value={name} type="text" className="form-control" onChange={(e) => setName(e.target.value)} id="floatingname" placeholder="John Doe" />
                                    <label htmlFor="floatingname">Full name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input required value={email} type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} id="floatingemail" placeholder="example@gmail.com" />
                                    <label htmlFor="floatingemail">Email id</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input required value={password} type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} id="floatingPassword" placeholder="Password" />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-outline-primary btn-login text-uppercase fw-bold" type="submit">Sign
                                        Up</button>
                                </div>
                                <div className="d-grid mt-2">
                                    <button onClick={()=>{setEmail(""); setPassword(""); setName("")}} className="btn btn-outline-danger btn-login text-uppercase fw-bold" type="reset">Reset</button>
                                </div>
                                <div className='mt-4'>
                                    Already have an account?<Link to={"/login"}>Sign in</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;