import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowRightFromBracket, faGauge } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useLocation } from 'react-router-dom';

export default function profile() {

  const location = useLocation();
  const userData = location.state;
  const handleClick = async () => {
    await fetch("http://localhost:3000/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        // <Navigate to="/login" />
        localStorage.removeItem("profileStatus");
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }
  const handleChange = (e) => {


  }

  return (
    <>
      <div className='border border-0' style={{ backgroundColor: "rgba(243, 247, 247, 1)", }}>
        <div className='border border-white container  px-0 bg-white pb-5 '>

          <div className=' d-flex flex-wrap justify-content-center  position-relative' style={{ height: "210px" }}>
            <div className='border w-100' style={{ height: "140px", backgroundColor: "#f6ddf7" }}>

            </div>
            <div className=' position-absolute mt-5 '>
              {
                userData.userdetail.gender == "male" ? <figure className=' text-center mb-0 '>
                  <img src='profileMan.webp' className='w-50  rounded-circle  border  border-2 border-info' />
                </figure>
                  :
                  <figure className=' text-center mb-0'>
                    <img src='profileWoman.png' className='w-50 rounded-circle border  border-2 border-info ' />
                  </figure>
              }
              <h4 className='text-center p-0 mt-3 '>{userData.userdetail.name}{userData.userdetail.lastName}</h4>
            </div>
          </div>
          <div className='row row-cols-2  mt-3 px-3'>
            <div className='  mt-2 col'>
              <h6 className=''>Name</h6>
              <input className='form-control text-muted' name='name' value={userData.userdetail.name} readOnly
              />
            </div>
            <div className='mt-2 col'>
              <h6 className='w-50'>Last Name</h6>
              <input className='form-control text-muted' value={userData.userdetail.lastName} readOnly />
            </div>
            <div className='col mt-2'>
              <h6 className='w-50'>Mobile No</h6>
              <input className='form-control text-muted' value={userData.userdetail.mobileNumber} readOnly />
            </div>
            <div className='col mt-2'>
              <h6 className='w-50'>Mail</h6>
              <input className='form-control text-muted' value={userData.userdetail.email} readOnly />
            </div>
            <div className='col mt-2'>
              <h6 className='w-50'>Gender</h6>
              <input className='form-control text-muted' value={userData.userdetail.gender} readOnly />
            </div>
            <div className='col mt-2 mb-2'>
              <h6 className='w-50'>Age</h6>
              <input className='form-control text-muted' value={userData.userdetail.age} readOnly />
            </div>
          </div>

          <hr className='border border-secondary mt-4' />
          <div className='border-bottom py-1 pt-0 ps-2'>
            <FontAwesomeIcon icon={faGauge} className="" />
            <h6
              className='d-inline'>
              <Link
                className='btn fw-bold'
                to="/dashbord"
              >
                Dashbord
              </Link> </h6>
          </div>
          <div className='border-bottom py-1 ps-2'>
            <FontAwesomeIcon icon={faArrowRightFromBracket} className='' />
            <h6
              className='d-inline '>
              <button
                className='btn btn fw-bold'
                onClick={handleClick}
              > Log out
              </button> </h6>
          </div>

        </div>
      </div >

    </>
  )
}
