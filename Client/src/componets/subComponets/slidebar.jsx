import React from "react";

export default function slidebar() {

  /*
   <img src="https://cdn.pixabay.com/photo/2022/11/22/04/34/black-friday-7608705_640.jpg" className="d-block w-100" alt="..." />
  
    <img src="https://media.istockphoto.com/id/483731084/photo/digital-tablet-laptop-and-smart-phone-on-a-wooden-table.jpg?s=2048x2048&w=is&k=20&c=ipNtAxYtBT8EHilX13CJgNy1o4tZOUi_paZM2mh48gI="
                className="d-block w-100" alt="..." />
  
      <img src="https://cdn.pixabay.com/photo/2016/12/09/11/33/smartphone-1894723_640.jpg" className="d-block w-100" alt="..." />
  
  */

  return (
    <>
      <div className="slideBox  mt-lg-4 container-lg ">
        <div id="carouselExampleAutoplaying" className="carousel slide " data-bs-ride="carousel">
          <div className="carousel-inner  ">
            <div className="carousel-item active">
              <img src="slider-products.jpg" className="d-block w-100 h-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="maky_orel-black-friday-4488821_1920.jpg" className="d-block w-100 h-100 " alt="..." />
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
