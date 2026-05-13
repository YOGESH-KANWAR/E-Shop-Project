import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeCart } from "../features/slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function cartDetails() {
  const dispatch = useDispatch();
  const carts = useSelector(state => state.TodoReducer.cartItems);
  const getProducts = useSelector(state => state.TodoReducer.allProducts);
  const getCategory = useSelector(state => state.TodoReducer.category);
  const cartIds = carts.map((item) => item.cartDetails.productId);
  const cartFilterId = new Set(cartIds);
  const filterCartProducts = Array.from(
    new Map(
      getProducts
        .filter(productItem => cartFilterId.has(productItem.id))
        .map(item => [item.id, item])
    ).values()
  );

  const deleteCart = async (pid) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/deleteCart/${pid}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (data.status === 200) {
      dispatch((removeCart(pid)));
    }
    else {
      const getData = JSON.parse(sessionStorage.getItem("carts")) || [];
      //pid se match nhi hoga true
      const filterData = getData.filter((item) => !pid.includes(item.cartDetails.productId));
      sessionStorage.setItem("carts", JSON.stringify(filterData));
      dispatch((removeCart(pid)));
    }

  };

  return (
    <>
      <div className="w-100 pb-3 " style={{ backgroundColor: "rgba(243, 247, 247, 1)" }}>
        <div className="container border" style={{ backgroundColor: "rgba(221, 189, 216, 0.21)" }}>
          <h4 className="container mt-3 mb-3  fw-bold ">Your Carts</h4>
          <div className=" row row-cols-2 px-2 gx-2 gy-2 row-cols-sm-3 px-sm-0 g-sm-3 row-cols-md-4 row-cols-lg-5 " >
            {
              (carts.length != 0) ? filterCartProducts.map((cartItem, index) => (
                <div key={cartItem.id}
                  className=" col pb-3"
                >
                  <div className="border bg-white rounded-3 p-2 overflow-hidden" style={{ borderColor: "#ddebeb" }}>
                    <figure className="cardHover w-100 d-flex justify-content-center  ">
                      <Link to="/ProductDetails"
                        state={{ productDetails: cartItem }}
                        className="d-block "
                        style={{ width: "150px", height: "125px" }}
                      >
                        <img
                          src={cartItem.image_url}
                          className="w-100 h-100"
                        />
                      </Link>
                    </figure>
                    <p className=" text-center p-2 pt-0 m-0 overflow-hidden" style={{ height: "25px", fontWeight: "500" }}>{cartItem.name}</p>
                    <button type="button"
                      className=" btn  w-100 btn-sm text-white mt-2"
                      style={{ backgroundColor: "#6428bf" }}
                      onClick={() => deleteCart(cartItem.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )) :
                <div className="vw-100 d-flex justify-content-center align-items-center border " style={{ height: "60vh", }}>
                  <div className="text-center"><FontAwesomeIcon icon={faCartShopping} className="" style={{ fontSize: "100px", color: "rgb(152, 13, 171)" }} />
                    <h1 style={{ color: "rgb(152, 13, 171)" }}>No Cart</h1></div>
                </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};
