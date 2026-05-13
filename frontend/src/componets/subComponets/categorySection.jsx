import React, { use, useRef } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

export default function categorySection() {
  const apiData = useSelector(state => state.TodoReducer.Api);
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <>
      <div className=" categorySection ">
        <h4 className="container mt-3 mb-3 fw-semibold ps-sm-0">Popular Categeries</h4>
        <div className="box1 position-relative container border "
          style={{ height: "225px", backgroundColor: "rgba(239, 190, 239, 0.59)" }}
        >

          {/* Left Button */}
          <button
            className="hoverBtn btn d-block p-0   position-absolute top-50 ms-2 start-0 translate-middle-y z-3 d-xl-none" style={{ height: "35px ", width: "30px", backgroundColor: " rgb(234, 223, 244)", }}
            onClick={() => scroll("left")}
          >
            ◀
          </button>

          {/* Products Row */}
          <div
            ref={scrollRef}
            className="box2 d-flex overflow-auto gap-3 py-3 "
            style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
          >
            {apiData.map((categoryItem, index) => (
              <div
                key={index}
                className="product-card card flex-shrink-0  border-0 bg-transparent"
                style={{}}
              >
                <Link
                  to="/categoryProduct"
                  state={{ category: categoryItem.category, image: categoryItem.categoryImage }}
                  className="cardBoxHover text-decoration-none text-black w-100  bg-light rounded-3 border "
                  style={{ boxShadow: "-5px,0,10px,rgba(0,0,0,0.3)" }}
                >
                  <img
                    src={categoryItem.categoryImage}
                    className="card-img-top product-img "
                    alt=""
                  />
                </Link>
                <div className="card-body text-center pt-2">
                  <h6 className="fw-bold">{categoryItem.category}</h6>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            className="hoverBtn btn  d-block p-0 position-absolute top-50 end-0 me-0 translate-middle-y z-3 d-xl-none" style={{ height: "35px ", width: "30px", backgroundColor: " rgb(234, 223, 244)", }}
            onClick={() => scroll("right")}
          >
            ▶
          </button>

        </div>


      </div>
    </>
  );
}
