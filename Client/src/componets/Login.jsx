import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { profileValue } from "../features/slice";


export default function Login({ closeModal }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginUser, setLoginUser] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await JSON.parse(sessionStorage.getItem("loginToken")) || [];
        if (user.length !== 0) return alert("please logout Account..");
        const fetchData = await fetch("http://localhost:3000/login",
            {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })
        const data = await fetchData.json();
        const userdetail = data.resData;

        if (fetchData.ok) {
            if (data.profileStatus === true) {
                localStorage.setItem("profileStatus", JSON.stringify({ activeStatus: false, gender: userdetail.gender }));
                dispatch(profileValue({ activeStatus: false, gender: userdetail.gender }));
                navigate("/profile", { state: { userdetail } });
            }
            alert(data.message);
            closeModal();
        } else {
            fetchData.catch((err) => console.log(err));
        }
    }

    return (
        <div style={{ backgroundColor: "rgba(243, 247, 247, 1)" }}>
            <div id="loginPage" className=" container vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(243, 247, 247, 1)" }}>
                <div className="row w-100 justify-content-center">

                    <div className="col-11 col-sm-12 col-md-10 col-lg-8 ">
                        <div className="card shadow-lg border-0 rounded-4 border">
                            <div className="card-body p-4">
                                <h1 className="text-center mb-4 mt-3">
                                    <span className="border border-secondary rounded-pill p-2 text-white " style={{ backgroundColor: "#222222bf", boxShadow: "0 0 5px rgba(171, 3, 249, 5)" }}><FontAwesomeIcon icon={faUser} /></span>
                                </h1>
                                <h3 className="text-center mb-4 fw-bold" style={{ color: "#a742f5" }}>Login User</h3>

                                <form onSubmit={handleSubmit} >

                                    <div className="mb-3 border-bottom d-flex ">
                                        <label className="form-label  fs-4"><FontAwesomeIcon icon={faEnvelope} /></label>
                                        <input
                                            type="email"
                                            required
                                            className="form-control p-2 border-0 ms-2"
                                            placeholder="User Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-4 d-flex border-bottom">
                                        <label className="form-label fs-4">
                                            <FontAwesomeIcon icon={faLock} />
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            className="form-control p-2 ms-2 border-0"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="text-center d-flex justify-content-around m-3">
                                        <span><input type="checkbox" /> <b className="text-muted">Remeber Me</b></span>
                                        <span><input type="checkbox" /> <b className="text-muted">Forget Password ?</b></span>
                                    </div>
                                    <div className="text-center">
                                        <button
                                            type="text"
                                            className="btn btn-primary w-75 p-2 rounded-5 fw-bolder fs-6" style={{ background: " linear-gradient(0deg,rgba(145, 37, 217, 1) 5%, rgba(45, 62, 253, 1) 100%)" }}
                                        >
                                            Login
                                        </button>
                                    </div>

                                    <h6 className="text-center m-3 text-decoration-none">Don't have account ? <NavLink to="/Singup">Sign up</NavLink ></h6>

                                </form>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}