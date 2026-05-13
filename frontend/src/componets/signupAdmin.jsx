import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function signupAdmin() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== rePassword) return alert("password not match..");
        fetch(`${import.meta.env.VITE_API_URL}/adminSignup`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name, email: email, password: password }),
            })
            .then((res) => {
                if (res.ok) {
                    return navigate("/loginAdmin")
                }
                res.json();
            })
            .then((data) => alert(data.message))
            .catch((err) => console.log(err.message));

    }
    return (
        <>
            <div className='' style={{ height: "100vh", backgroundImage: "url('sambeetarts-geometric-1732847.jpg')" }}>
                <div className='container  d-flex justify-content-center'>
                    <div className='  col-12 col-md-9 col-lg-7  my-5 px-5 py-4 rounded-5 border' style={{ background: "rgba(195, 201, 209, 0.39)" }}>
                        <h3 className='text-center pb-3 text-white fw- '> Admin Signup</h3>
                        <form className='adminLoginPage' onSubmit={handleSubmit}>
                            <div className='border d-flex rounded-5 bg-white mb-4 '>
                                <input type='text' required placeholder='Name' className='form-control ps-4  rounded-5 border-0' style={{ height: "50px" }}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <span className='d-block px-3 pt-3' style={{ paddingTop: "12px" }}><FontAwesomeIcon icon={faUser} className='fs-4' /></span>
                            </div>
                            <div className='border d-flex rounded-5 bg-white mb-4 '>
                                <input type='email' required id='email' placeholder='Email' className='form-control ps-4  rounded-5 border-0' style={{ height: "50px" }}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <span className='d-block px-3 ' style={{ paddingTop: "12px" }}><FontAwesomeIcon icon={faEnvelope} className='fs-4' /></span>

                            </div>
                            <div className='border d-flex rounded-5 bg-white mb-4 '>
                                <input type='password' required id='password' placeholder="Password" className='form-control ps-4  rounded-5 border-0' style={{ height: "50px" }}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className='d-block px-3' style={{ paddingTop: "12px" }}><FontAwesomeIcon icon={faLock} className='fs-4' /></span>
                            </div>
                            <div className='border d-flex rounded-5 bg-white mb-4 '>
                                <input type='re-password' required id='re-password' placeholder="Confirm Password" className='form-control ps-4  rounded-5 border-0' style={{ height: "50px" }}
                                    onChange={(e) => setRePassword(e.target.value)}
                                />
                                <span className='d-block px-3 ' style={{ paddingTop: "12px" }}><FontAwesomeIcon icon={faClockRotateLeft} className='fs-4' /></span>
                            </div>
                            <div className='text-center mt-5'>
                                <button type='submit' className='btn w-100 fw-bold text-white rounded-5 fs-5' style={{ height: "50px", background: "rgb(152, 221, 228)" }}> Submit</button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </>
    )
}
