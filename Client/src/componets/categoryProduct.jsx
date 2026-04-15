import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; //get data url
import ProductCard from "./productCard.jsx";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function categoryProduct() {
  const [products, setProducts] = useState([]);
  const loaction = useLocation();
  // const [api, setApi] = useState([]);
  const productCategory = loaction.state;
  const apiData = useSelector(state => state.TodoReducer.Api);
  const myData = async () => {
    const filterData = await apiData.filter((item) => {
      return item.category === productCategory.category
    }
    );
    const rodData = filterData[0].products;

    setProducts(rodData);
  }
  useEffect(() => {
    myData()
  }, [myData])

  return (
    <>
      <div className="pb-5" style={{ backgroundColor: "rgba(243, 247, 247, 1)" }}>
        <div
          className="container  px-sm-0"
        >
          <h4 className="py-3 fw-semibold   ">Products</h4>
          <div className="row row-cols-2 px-2 gx-2 gy-2 row-cols-sm-2 px-sm-0 g-sm-3 row-cols-md-3 row-cols-lg-4 ">
            {products.map((productItem, index) => (
              <div className="col" key={index}>
                <ProductCard
                  key={productItem.id}
                  productDetails={productItem}
                //productCategory={productItem}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
