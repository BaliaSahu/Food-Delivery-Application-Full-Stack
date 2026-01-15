import { useContext, useState } from 'react';
import './contact.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { messageSend } from '../../service/cartService';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const{token}=useContext(StoreContext);
    const navigate=useNavigate();

    const [email,setEmail]=useState("");
    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[message,setMessage]=useState("");

    const sendMessage=async(e)=>{
        e.preventDefault();
        try{
            const data={
                "email":email
                ,"firstName":firstName
                ,"lastName":lastName,"message":message
            }
            
            if(!token){
                console.log("No token")
                navigate("/login");
                throw new Error("Please login");
            }
            const res=await messageSend(data,token);
            console.log(res);
            if(res.status===200){
                console.log(res);
                toast.success("Message Send Successfully");
                setEmail("");
                setFirstName("");
                setLastName("");
                setMessage("");
            }
        }catch(error){
            console.log(error)
            toast.error("Message Not Send. "+error);
        }
    }

    return (
        <section className="py-5 ">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="contact-form p-5 shadow-sm bg-white">
                            <h2 className="text-center mb-4">Get in Touch</h2>
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" required className="form-control custom-input" placeholder="First Name"/>
                                    </div>
                                    <div className="col-md-6">
                                        <input value={lastName} onChange={(e)=> setLastName(e.target.value)} type="text" required className="form-control custom-input" placeholder="Last Name"/>
                                    </div>
                                    <div className="col-12">
                                        <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" required className="form-control custom-input" placeholder="Email Address"/>
                                    </div>
                                    <div className="col-12">
                                        <textarea value={message} onChange={(e)=> setMessage(e.target.value)} required className="form-control custom-input" rows="5" placeholder="Your Message"></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button onClick={(e)=> sendMessage(e)} className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
    
}
export default ContactUs;