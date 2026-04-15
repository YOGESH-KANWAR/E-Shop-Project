import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

export default function loginAdmin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/adminLogin",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password }),
            })
            .then((res) => {
                if (res.ok) {
                    alert("login Successfuly...");
                    return navigate("/dashbord");
                }
                res.json();
            })
            .then((data) => alert(data.message))
            .case((err) => console.log(err.message));

    }
    return (
        <>
            {/* backgroundColor: "rgba(243, 247, 247, 1)", */}
            <div className='' style={{ height: "100vh", backgroundImage: "url('sambeetarts-geometric-1732847.jpg')" }}>
                <div className='container  d-flex justify-content-center' style={{}}>
                    <div className='  col-12 col-md-9 col-lg-7  my-5 p-5 rounded-5 border' style={{ background: "rgba(195, 201, 209, 0.39)" }}>
                        <h3 className='text-center text-white mb-5 fw-bold'> Admin Login</h3>
                        <form className='adminLoginPage' onSubmit={handleSubmit}>
                            <div className='border d-flex rounded-5 bg-white mb-4 ' >
                                <input type='email' required placeholder='Email' className='form-control ps-4  rounded-5 border-0' style={{ height: "50px" }}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <span className='d-block px-3 pt-2'><FontAwesomeIcon icon={faEnvelope} className='fs-3' /></span>
                            </div>
                            <div className='border d-flex rounded-5 bg-white '>
                                <input type='password' required placeholder='Password' className='form-control rounded-5 border-0 ps-4'
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ height: "50px" }}
                                />
                                <span className='d-block px-3 pt-2'><FontAwesomeIcon icon={faLock} className='fs-3' /></span>
                            </div>
                            <div className='text-center mt-5'>
                                <button type='submit' className='btn w-100 fw-bold text-white rounded-5 fs-5' style={{ height: "50px", background: "rgb(152, 221, 228)" }}> Submit</button>
                            </div>
                            <div className='text-center mt-3'>
                                <h6 className='text-white fw-semibold fs-6'>Don't have account ? <Link to="/signupAdmin" className='text-dark bg-white px-1'>Sign up</Link></h6>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </>
    )
}
