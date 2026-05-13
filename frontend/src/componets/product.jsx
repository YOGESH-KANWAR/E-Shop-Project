import ProductCard from "./productCard.jsx";
import { useSelector } from "react-redux";

export default function product() {
  const getProducts = useSelector(state => state.TodoReducer.allProducts);
  // const getCategory = useSelector(state => state.TodoReducer.category);

  return (
    <>
      <div style={{ backgroundColor: "rgba(243, 247, 247, 1)" }}>
        <div className="container p-0 pb-3" style={{ backgroundColor: "rgba(221, 189, 216, 0.21)" }}>
          <div className="container-2 d-flex gutter-1">
            <div className=" w-100 ">
              <h3 className=" p-2 pt-3">Products</h3>

              <div className="row row-cols-2 px-2 gx-2 gy-2 row-cols-sm-2 px-sm-2 g-sm-3 row-cols-md-3 row-cols-lg-4 ">
                {getProducts.map((singleProduc, index) => (
                  <div className="col" key={index}>
                    <ProductCard
                      key={index}
                      productDetails={singleProduc}
                    // productCategory={getCategory[index]}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
