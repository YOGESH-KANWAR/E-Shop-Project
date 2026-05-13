import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SlideBar from "./componets/subComponets/slidebar"
import CategorySection from "./componets/subComponets/categorySection";
import NewLaunchesSmartphone from "./componets/subComponets/newLaunchesSmartphone";
import { useDispatch, useSelector } from "react-redux";
import { cartCount } from "./features/slice";
export default function App() {

  return (
    <>
      <div className=" mb-3 mt-0 " style={{ backgroundColor: "rgba(243, 247, 247, 1)", border: "1px solid rgba(243, 247, 247, 1)" }}>
        <SlideBar />
        <CategorySection />
        <NewLaunchesSmartphone />
        <div className="row d-flex px-2 pt-3 mt-2 " style={{ backgroundColor: "rgb(230, 221, 240)" }}>
          <div className="col">
            <h5>Free Shipping</h5>
            <p>Free Shipping at your door step.Free Returns</p>
          </div>
          <div className="col">
            <h5>Free Returns</h5>
            <p>Free return if products are damaged.</p>
          </div>
          <div className="col">
            <h5>Support 24/7</h5>
            <p>24/7 and 365 days support is available.</p>
          </div>
          <div className="col">
            <h5>100% Safe & Secure</h5>
            <p>100% Safe & Secure</p>
          </div>
        </div>
      </div>
    </>
  );
}
