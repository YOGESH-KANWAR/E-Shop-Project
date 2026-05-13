import React from "react";

export default function slidebar() {
  return (
    <>
      <div className="slideBox  mt-lg-4 container-lg ">
        <div id="carouselExampleAutoplaying" className="carousel slide " data-bs-ride="carousel">
          <div className="carousel-inner  ">
            <div className="carousel-item active">
              <img src={"https://res.cloudinary.com/dwk3twqte/image/upload/v1778591353/slider-products_nfsfud.jpg"} className="d-block w-100 h-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={"https://res.cloudinary.com/dwk3twqte/image/upload/v1778591344/maky_orel-black-friday-4488821_1920_fhpixl.jpg"} className="d-block w-100 h-100 " alt="..." />
            </div>

          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

      </div>

    </>
  );
}
