import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../componets/Login"
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../features/slice";

export default function productDetails() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectCart = useSelector((state) => state.TodoReducer.cartItems);
  const location = useLocation();
  const productDetail = location.state.productDetails;
  const productCategory = location.state.productCategory;

  // model close....
  const loginSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("loginUser", JSON.stringify({ email, password }));
    alert("login Successfuly..");
    setModal(false);
  };

  const addCardBtn = async () => {
    const cartItem = {
      cartDetails: {
        productId: productDetail.id,
        productImage: productDetail.image_url,
        productName: productDetail.name,
        productPrice: productDetail.productPrice,
      },
    };
    const res = await fetch(`${import.meta.env.VITE_API_URL}/addCart`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItem),
    });
    const data = await res.json();
    if (data.status === 200) {
      return dispatch(addCart(cartItem));
    } else {
      const getCarts = JSON.parse(sessionStorage.getItem("carts")) || [];
      await getCarts.push(cartItem);
      sessionStorage.setItem("carts", JSON.stringify(getCarts));
      dispatch(addCart(cartItem));
    }
  }
  const conformSubmit = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/profile`, {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        let userId = data.resData.email;
        if (data.profileStatus === true) {
          setModal(true);
        } else {
          navigate("/ProductOrder", { state: { productDetail, userId } });
        }
      })
      .catch((err) => {
        setModal(true)
        console.log(err.message)
      });
  };

  return (
    <>
      {/* Modal..  */}
      {modal && (<div className="modal fade show d-block  " id="exampleModal" >
        <div className="modal-dialog  modal-lg" style={{}}>
          <div className="modal-content ">
            <div className="modal-header  ">
              <button type="button" className="btn-close p-1" onClick={() => setModal(false)}  ></button>
            </div>
            <div className="modal-body p-0 ">
              {/*Modal close ke liye function pass login page pe  */}
              <Login closeModal={() => setModal(false)} />
            </div>
          </div>
        </div>
      </div>
      )}
      {/* Product Details */}
      <div style={{ backgroundColor: "rgba(243, 247, 247, 1)" }}>
        <div id="productDetails" className=" container d-flex justify-content-center pt-3 pb-5 pt-lg-5  p-0 " style={{ backgroundColor: "rgba(221, 189, 216, 0.21)" }}>
          <div className=" w-100 w-md-75"
          >
            <div
              className="d-flex flex-wrap justify-content-center w-100 flex-md-nowrap">
              <div className=" box1  w-100 h-100 p-0 w-md-50 p-lg-0 ">
                <figure className=" pe-lg-4">
                  <img
                    src={productDetail.image_url}
                    className="w-100 h-100 text-center border  mb-5 rounded-3"
                  />
                </figure>
                <div className=" box1-1 border " style={{}}>
                  <img src={productDetail.image_url}
                    className=" h-100 border rounded-3 "
                  />
                </div>
              </div>
              <div className="box2 w-100 ps-2 pe-2 pt-4 pt-lg-3  w-md-50 ps-sm-0 ps-md-4 ">
                <h4>{productDetail.name}</h4>
                <h5 className=" text-muted  ">
                  <span className=" border text-black bg-white px-1 rounded-3"> <small>{productDetail.rating}</small>
                    <span className="text-success ">★</span>
                  </span>
                  <small className="fs-6"> Rating - reviews</small>
                </h5>
                <h5 className=" text-muted ">
                  <span className="fw-bold text-black"> $ {productDetail.price}.00</span>
                </h5>

                <h5 className="fw-semibold">
                  <small className="fw-bold">Features :-</small>
                  <div className="ms-3 mt-1  text-muted">
                    <h6>- {productDetail.features[0]}</h6>
                    <h6>- {productDetail.features[1]}</h6>
                    <h6>- {productDetail.features[2]}</h6>
                    <h6>- {productDetail.features[3]}</h6>
                  </div>
                </h5>
                <h6 className=" text-black fw-bold">Warranty -
                  {productDetail.warranty}
                  <span className="fw-normal text-muted"> Manufacturer Warranty for Device and 6 Months Manufacturer Warranty for Inbox Accessories
                  </span>
                </h6>
                <h6 className=" text-black fw-bold ">Release date -
                  <span className="fw-semibold text-muted">
                    <small>{productDetail.release_date}</small> </span>
                </h6>
                <div className="text-center mt-4 mb-3 d-flex">
                  {
                    selectCart.find(cartItem => cartItem.cartDetails.productId === productDetail.id)
                      ?
                      <button
                        // onClick={() => dispatch(addCart(productDetail))}
                        className="btn btn-danger w-50  me-1"
                      >
                        Add In Cart
                      </button>
                      :
                      <button
                        onClick={() => addCardBtn()}
                        className="btn w-50 me-1 text-white"
                        style={{ backgroundColor: "#6428bf" }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#3b127a")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#6428bf")}
                      >
                        Add Cart
                      </button>
                  }

                  <button className="btn text-white w-50 ms-1"
                    style={{ backgroundColor: "#368a56" }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#286640")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#368a56")}
                    onClick={() => conformSubmit()}>
                    By Now
                  </button>
                </div>
              </div>
            </div>
          </div>



        </div >
      </div>
    </>
  );
}
