import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext"
import { loginService } from "../../service/orderService";

const Login = () => {

    const { token, setToken } = useContext(StoreContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = { email, password }
            const res = await loginService(data);

            if (res.status == 200) {
                setToken(res.data.token);
                toast.success("Login Successfull.");
                setEmail("")
                setPassword("");
                navigate("/")
            }
        } catch (error) {
            toast.error("Login Failed. ");
            // console.log(error);
        }
    }
    const resetHandler = () => {
        setEmail("");
        setPassword("");
    }
    return (
        <div className=" login-container ">
            <div className="row ce" >
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                            <form onSubmit={(e) => onSubmitHandler(e)} >
                                <div className="form-floating mb-3">
                                    <input value={email} required onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input value={password} required onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-outline-primary btn-login text-uppercase fw-bold" type="submit">Sign
                                        in</button>
                                </div>
                                <div className="d-grid mt-2">
                                    <button onClick={resetHandler} className="btn btn-outline-danger btn-login text-uppercase fw-bold" type="reset">Reset</button>
                                </div>
                                <div className='mt-4'>
                                    Don't have an account?<Link to={"/register"}>Sign up</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;