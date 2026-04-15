import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, addTodo } from "../features/slice";

export default function productCard(props) {
  const selectCart = useSelector((state) => state.TodoReducer.cartItems);
  const dispatch = useDispatch();
  const productDetails = props.productDetails;

  const addCardBtn = async () => {
    const cartItem = {
      cartDetails: {
        // category: props.productCategory,
        productId: productDetails.id,
        productImage: productDetails.image_url,
        productName: productDetails.name,
        productPrice: productDetails.productPrice,
      },
    };
    const res = await fetch("http://localhost:3000/addCart", {
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
      await sessionStorage.setItem("carts", JSON.stringify(getCarts));
      await dispatch(addCart(cartItem));
    }

  }

  return (
    <>
      <div
        id="productCard"
        className=" card   rounded-4 bg-body  "
        style={{ width: "100%", height: "310px", borderColor: "#ddebeb" }}
      >
        <figure className=" productCardImage d-flex justify-content-center p-2 mb-2  " >
          <Link
            to="/ProductDetails"
            state={{ productDetails }}
            className=" d-block" style={{ width: "170px", height: "170px" }}
          >
            <img
              src={`productImage/${productDetails.image_url}`}
              className="card-img-top w-100 h-100 "
              alt="..."
            />
          </Link>
        </figure>
        <div className="card-body pt-0">
          <p
            className="card-text overflow-hidden m-0 "
            style={{ height: "30px", fontWeight: "500" }}
          >
            {productDetails.name}
          </p>
          <h6 className="card-title pb-1" style={{ color: "#6428bf" }}>${productDetails.price}.00</h6>
          {
            selectCart.find(cartItem => cartItem.cartDetails.productId === productDetails.id)
              ?
              <button
                // onClick={() => addCardBtn()}
                className="btn btn-danger w-100 "
                style={{ padding: "2.5px" }}
              >
                Add In Cart
              </button>
              :
              <button
                onClick={() => addCardBtn()}
                className=" btn w-100 text-white "
                style={{ backgroundColor: "#6428bf", padding: "2.5px" }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#3b127a")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#6428bf")}
              >
                Add to Cart
              </button>
          }
        </div>

      </div>
    </>
  );
}
