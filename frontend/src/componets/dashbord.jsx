import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function dashbord() {
    return (
        <>
            <div className='' style={{
                background: "linear-gradient(178deg,rgba(34, 5, 56, 1) 47%, rgba(110, 67, 103, 1) 100%)", height: "100vh"
            }}>
                <nav className=' text-white ' style={{ background: "linear-gradient(179deg,rgba(131, 58, 180, 1) 0%, rgba(62, 36, 145, 1) 50%, rgba(84, 55, 97, 1) 100%)" }
                } >
                    <div className='container px-0'>
                        <h2 className=' m-0 py-2 '>Dashbord</h2>
                    </div>
                </nav >
                <div className='container  text-white ps-0 '>
                    <div className='d-flex justify-content-center align-items-center  w-100' style={{ height: "90vh" }}>
                        <div className=' '>
                            <h1 className='text-center' style={{ fontSize: "100px" }}>
                                <FontAwesomeIcon icon={faUser} />
                            </h1>
                            <h3 className='text-white w-100 text-center'>Hello, Admin</h3>
                            <div className='text-center'><Link to="/" className='btn text-white  d-inline-block border mt-3 py-1' style={{ fontSize: "20px" }}>Logout</Link></div>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}
