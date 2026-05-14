import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

export default function singup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    gender: "",
    age: "",
    password: "",
    confPassword: "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confPassword) {
      return alert("conform password not matched");
    }
    const fetchData = await fetch(`${import.meta.env.VITE_API_URL}/singup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          lastName: formData.lastName,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
          gender: formData.gender,
          age: formData.age,
          password: formData.password,
        }),
      }
    );
    const data = await fetchData.json();
    alert(data.message);
    if (data.statusOk === true) {
      let userdetail = formData;
      return navigate("/profile", { state: { userdetail } })
    }

  }

  return (
    <>
      <div className=' border' style={{ backgroundColor: "rgba(243, 247, 247, 1)" }}>
        <div className="container border py-5 d-flex justify-content-center align-items-center">
          <div className='row w-100 justify-content-center '>
            <div className="col-11 col-sm-12 col-md-10 col-lg-8 px-3 ">
              <div className="card shadow-lg border-0 rounded-4 border">
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-center mb-4 fw-bold " style={{ color: "#a742f5" }}>Register</h3>
                    <div className="mb-3 border-bottom d-flex ">
                      <input type='text'
                        name='name'
                        className="form-control p-2 border-0 ms-2"
                        placeholder='Name'
                        value={formData.name}
                        onChange={((e) => setFormData({ ...formData, name: e.target.value }))}
                      />
                    </div>
                    <div className="mb-3 border-bottom d-flex ">
                      <input type='text'
                        name='lastName'
                        className="form-control p-2 border-0 ms-2"
                        placeholder='LastName'
                        value={formData.lastName}
                        onChange={((e) => setFormData({ ...formData, lastName: e.target.value }))}
                      />
                    </div>
                    <div className="mb-3 border-bottom d-flex ">
                      <input type='text'
                        name='mobileNumber'
                        value={formData.mobileNumber}
                        placeholder='Mobile Number'
                        className="form-control p-2 border-0 ms-2"
                        onChange={((e) => setFormData({ ...formData, mobileNumber: e.target.value }))}
                      />
                    </div>
                    <div className="mb-3 border-bottom d-flex ">
                      <input type='email'
                        name='email'
                        value={formData.email}
                        placeholder='Email'
                        className="form-control p-2 border-0 ms-2"
                        onChange={((e) => setFormData({ ...formData, email: e.target.value }))}
                      />
                    </div>
                    <div className="pb-2 ms-3 border-bottom d-flex " >
                      <div className='form-check form-check-inline me-3'>
                        <label className='form-check-label' htmlFor="male">
                          Male
                        </label>
                        <input type='radio'
                          name='gender'
                          value='male'
                          id='male'
                          className="form-check-input"
                          onChange={((e) => setFormData({ ...formData, gender: e.target.value }))}
                        />

                      </div>
                      <div className='form-check form-check-inline '>
                        <label className='form-check-label' htmlFor="female">
                          Female
                        </label>
                        <input type='radio'
                          name='gender'
                          value='female'
                          id="female"
                          className="form-check-input"
                          onChange={((e) => setFormData({ ...formData, gender: e.target.value }))}
                        />

                      </div>
                    </div>
                    <div className="mb-3 border-bottom d-flex ">
                      <input type='text'
                        className="form-control p-2 border-0 ms-2"
                        value={formData.age}
                        placeholder='Age'
                        onChange={((e) => setFormData({ ...formData, age: e.target.value }))}
                      />
                    </div>

                    <div className="mb-3 border-bottom d-flex ">
                      <input type='password'
                        name='password'
                        className="form-control p-2 border-0 ms-2"
                        placeholder='Password'
                        onChange={((e) => setFormData({ ...formData, password: e.target.value }))}
                      />
                    </div>
                    <div className="mb-3 border-bottom d-flex ">
                      <input type='password'
                        name='password'
                        className="form-control p-2 border-0 ms-2"
                        placeholder='Conform Password'
                        onChange={((e) => setFormData({ ...formData, confPassword: e.target.value }))}
                      />
                    </div>
                    <div className='d-flex justify-content-center mt-5'>
                      <button type='submit'
                        className='btn text-white w-50 '
                        style={{ background: " linear-gradient(0deg,rgba(145, 37, 217, 1) 5%, rgba(45, 62, 253, 1) 100%)" }}
                      >Submit</button>
                    </div>
                    <h6 className='text-center mt-3'>Already have on account? <NavLink to="/login" ><b> Log in</b></NavLink></h6>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >

    </>
  )
}
