import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function category() {
  const [catData, setCatData] = useState([]);
  const apiData = useSelector(state => state.TodoReducer.Api);
  return (
    <>
      <div className="categoryContainer  " style={{ backgroundColor: "rgba(243, 247, 247, 1)" }}>
        <div className=" p-0 container  d-flex flex-wrap  justify-content-around
         justify-content-sm-between"  style={{ backgroundColor: "rgba(221, 189, 216, 0.21)" }}>
          <h3 className="w-100 p-2 ">Category</h3>
          {apiData.map((categoryItem, index) => (
            <div key={index}
              className="catBox border rounded-4 overflow-hidden"
              style={{}}
            >
              <Link to="/CategoryProduct" state={{ category: categoryItem.category, image: categoryItem.categoryImage }}>
                <div className="categoryImg w-100 h-100 position-retaltive">
                  <h3 className="categoryName  position-absolute border-bottom-5"
                    style={{}}>
                    {categoryItem.category}
                  </h3>
                  <img src={categoryItem.categoryImage}
                    className="w-100 h-100 "
                  />
                </div>
              </Link>
            </div>
          ))}
        </div >
      </div >
    </>
  );
}
