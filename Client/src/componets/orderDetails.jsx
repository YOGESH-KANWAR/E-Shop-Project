import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import productDetails from "./productDetails";
import { useSelector } from "react-redux";


export default function orderDetails() {
  const [orderData, setOrderData] = useState([]);
  const allProducts = useSelector(state => state.TodoReducer.allProducts);
  //const getCategory = useSelector(state => state.TodoReducer.category);

  const ordData = orderData.map((item) => item.orderProduct);
  const orderProductIds = ordData.map((item) => item.productId);
  const orderProducts = allProducts.filter((item) => orderProductIds.includes(item.id));
  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/orderDetail", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    const response = data.resData;
    if (!response) return;
    setOrderData(data.resData);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <div className=" border" style={{ backgroundColor: "rgba(243, 247, 247, 1)" }}>

        <div className="container d-flex flex-wrap mb-3" style={{ backgroundColor: "rgba(221, 189, 216, 0.21)" }}>
          <h4 className="container mt-4 mb-2 fw-bold">Your Orders</h4>
          {orderData.length != 0 ? orderData.map((item, index) => (
            <div
              key={index}
              className="border w-100 mb-3  bg-white rounded-3 p-3 "
              style={{}}
            >
              <div className="w-100 border-bottom mb-2">
                <span className="w-50 d-inline-block">
                  <small className="text-muted">Date of order : </small>
                  <small className="fw-semibold">{formatDateTime(item.createdAt)}</small>
                </span>
                <span className="w-50 text-end d-inline-block">
                  <small className="text-muted">Order ID : </small>
                  <small className="fw-semibold">{item.orderId}</small></span>
              </div>
              <div className="d-flex  ">
                <figure
                  className="border p-2 rounded-3 me-3 border mb-0" style={{ width: "200px", height: "110px" }}>
                  <img
                    src={`productImage/${item.orderProduct.imageUrl}`}
                    className="w-100 h-100 rounded-3"
                  />
                </figure>
                <div className=" w-100  d-flex flex-column flex-md-row  ">
                  <div className="w-100 ">
                    <h6 className=" fw-bold my-1 mt-md-2 ">{item.orderProduct.productName}</h6>
                    <h6 className="my-0 mt-md-1">${item.orderProduct.totalPrice}.00</h6>
                    <small
                      className="fw-semibold my-0 mt-md-0  "
                      style={{ fontSize: "12px" }}
                    >QTY -{item.orderProduct.quantity}</small>
                    <p className="text-muted  mb-2 mt-0  mt-md-1"
                      style={{ lineHeight: "16px" }}
                    ><small>Item is eligible fo return up to 30 days from purchease</small></p>
                  </div>
                  <div className=" text-md-end  ">
                    <Link
                      to="/productDetails"
                      state={{ productDetails: orderProducts[index] }}
                      className="btn btn-sm border border-2 rounded-3 py-1 me-1 shadow bg-light fw-semibold mt-md-4" style={{ width: "80px" }}><small>Buy Again</small></Link>
                  </div>
                </div>
              </div>
            </div>
          )
          )
            :
            <div className="vw-100 d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
              <div className="text-center"> <FontAwesomeIcon icon={faBagShopping} className="" style={{ fontSize: "100px", color: "rgb(152, 13, 171)" }} />

                <h1 className="" style={{ color: "rgb(152, 13, 171)" }}>No Order</h1></div>

            </div>
          }
        </div>
      </div >
    </>
  );
}
