import React, { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
//import { faCardShopping } from "@fortawesome/free-brands-svg-icons";
import { faBagShopping, faCartPlus, faUser, faHouse, faLayerGroup, faGauge, faShop, faGear, faCircleUser, faArrowRightFromBracket, } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { cartCount, addCart } from "../features/slice";
import { cartData } from "../features/slice";
import { useNavigate } from "react-router-dom";
import { profileValue } from "../features/slice";



export default function navbar() {
  const [userdetail, setUserdetail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartVal = useSelector(state => state.TodoReducer.cartItems);
  const profile = useSelector(state => state.TodoReducer.profile);
  const fetchProfile = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserdetail(data.resData);
        if (data.profileStatus == true) {
          return localStorage.setItem("profileStatus", JSON.stringify({ activeStatus: data.profileStatus }));
        } else {
          return;
        }
      })
      .catch((err) => console.log("error", err));

  }
  useEffect(() => {
    fetchProfile();
  }, []);

  const getCarts = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/getCart`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();

    if (data.status == 200) {
      return dispatch(cartData(data.resData));
    }
    const getCarts = JSON.parse(sessionStorage.getItem("carts")) || [];
    sessionStorage.setItem("carts", JSON.stringify(getCarts));
    dispatch(cartData(getCarts));

  };

  useEffect(() => {
    getCarts();
  }, [profile])

  /// logout user..
  const handleClick = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        window.location.href = "/login";

      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className=" navBgColor d-flex justify-content-center sticky-top top-0  " style={{ zIndex: 1000 }}>
        <nav className="  navbar navbar-expand-lg container-lg  w-100 " >
          <div className=" w-100 btnBar  ">
            <button
              className="btn btn-outline-dark me-2 position-absolute customTop    d-lg-none  "
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasSidebar"
              aria-controls="offcanvasSidebar"
            >
              ☰
            </button>

            <div className=" collapse navbar-collapse  " id="navbarNav">
              <ul className=" nav-hover navbar-nav w-75 ">
                <li className="nav-item m-2 ms-0 ">
                  <Link
                    className="nav-link  fw-bold  "
                    style={{ color: "#62599C" }}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item m-2">
                  <Link
                    className=" nav-link fw-bold  "
                    style={{ color: "#62599C" }}
                    to="/category"
                  >
                    Category
                  </Link>
                </li>
                <li className="nav-item m-2">
                  <Link
                    className="nav-link fw-bold  "
                    style={{ color: "#62599C" }}
                    to="/Product"
                  >

                    Products
                  </Link>
                </li>
                <li className="nav-item m-2">
                  <Link
                    className="nav-link fw-bold  "
                    style={{ color: "#62599C" }}
                    to="/loginAdmin"
                  >
                    Dashbord
                  </Link>
                </li>
              </ul>
              <ul className="nav-hover navbar-nav justify-content-end  w-25">
                <li className="nav-item m-2 pt-1 position-relative border rounded-5  bg-light">
                  <Link
                    className="nav-link fw-bold   "
                    style={{ color: "#62599C" }}
                    to="/cartDetails"
                  >
                    <FontAwesomeIcon icon={faCartPlus} className="fs-5 fw-bolder"></FontAwesomeIcon>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartVal.length}</span>
                  </Link>
                </li>
                <li className="nav-item m-2 pt-1 rounded-5 border  bg-light">
                  <Link
                    className="nav-link fw-bold "
                    style={{ color: "#62599C" }}
                    to="/OrderDetails"
                  >

                    <FontAwesomeIcon icon={faBagShopping} className="fs-5 fw-bolder" />
                  </Link>
                </li>


                {
                  profile.activeStatus ?
                    <li className="nav-item m-2 me-0 pt-1 rounded-5 border bg-white  " >
                      <Link
                        className="nav-link fw-bold   "
                        to="/Login">
                        {<FontAwesomeIcon icon={faUser} className="fs-5 fw-bolder   " />}

                      </Link>
                    </li>
                    : <p className=" m-0 p-0 pt-1 rounded-5 " style={{}}>
                      <Link
                        className=" p-1"
                        to="/profile" state={{ userdetail }}>
                        {profile.gender == "male" ? <img src={'https://res.cloudinary.com/dwk3twqte/image/upload/v1778591343/profileMan_scp5sj.webp'} className="rounded-5 p-0" style={{ width: "50px", height: "50px" }} />
                          :
                          <img src={'https://res.cloudinary.com/dwk3twqte/image/upload/v1778591346/profileWoman_t30szr.png'} className="rounded-5 p-0" style={{ width: "50px", height: "50px" }} />
                        }
                      </Link>
                    </p>
                }

              </ul>

            </div>
          </div>
        </nav >




      </div >

      {/* offcanvase section..... */}
      <div
        className="offcanvas offcanvas-start bg-dark  position-absolute"
        tabIndex="-1"
        id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel"

      >
        <div className="offcanvas-header bg-white">
          <h5 className="offcanvas-title" id="offcanvasSidebarLabel">
            Sidebar Menu
          </h5>
          <button
            type="button"
            className="btn-close bg-white btn-close-dark shadow-none"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body bg-white ">
          <ul className="nav flex-column">
            <li className="nav-item " data-bs-dismiss="offcanvas">
              <Link className="nav-link text-dark  fw-semibold " href="#">
                <FontAwesomeIcon icon={faHouse} className="me-2" />
                home
              </Link>
            </li>
            <li className="nav-item" data-bs-dismiss="offcanvas">
              <Link
                to="/category"
                className="nav-link text-dark fw-semibold" href="#">
                <FontAwesomeIcon icon={faLayerGroup} className="me-2" />
                Category
              </Link>
            </li>
            <li className="nav-item" data-bs-dismiss="offcanvas">
              <Link
                to="/product"
                className="nav-link  text-dark fw-semibold" href="#">
                <FontAwesomeIcon icon={faShop} className="me-2" />
                Products
              </Link>
            </li>
          </ul>
          <hr className="border border-dark mt-3" />
          <ul className="nav flex-column ">
            <li className="nav-item fw-bold" data-bs-dismiss="offcanvas">
              <Link to="/admin "
                className="nav-link  text-dark py-1" href="#">
                <FontAwesomeIcon icon={faGauge} className="me-2" />
                Dashboard
              </Link>
            </li>


            {
              profile.activeStatus ?
                <li className="nav-item fw-bold" data-bs-dismiss="offcanvas">
                  <Link to="/Login"
                    className="nav-link  text-dark py-1" href="#">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Login
                  </Link>
                </li>
                :
                <ul className="nav flex-column">
                  <li className="nav-item fw-bold" data-bs-dismiss="offcanvas">
                    <Link to="/profile" state={{ userdetail }}
                      className="nav-link  text-dark py-1" href="#">
                      <FontAwesomeIcon icon={faCircleUser} className="me-2 text-info" />
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item  fw-bold" data-bs-dismiss="offcanvas">
                    <Link
                      className="nav-link text-dark py-1" href="#"
                      onClick={handleClick}
                    >
                      <FontAwesomeIcon icon={faArrowRightFromBracket} className="me-2" />
                      Logout
                    </Link>
                  </li>
                </ul>
            }

            <li className="nav-item fw-bold" data-bs-dismiss="offcanvas">
              <Link className="nav-link  text-dark py-1" href="#">
                <FontAwesomeIcon icon={faGear} className="me-2" />
                Settings
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </>
  );
}
