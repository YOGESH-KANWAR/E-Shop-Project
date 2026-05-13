import React from 'react'

export default function custemPage() {
  return (
    <>
      <div>


        <div>custemPage</div>
        <div id="categoryCarousel" className="carousel slide" data-bs-ride="false">

          {/* Slider Items */}
          <div className="carousel-inner">

            <div className="carousel-item active">
              <div className="d-flex justify-content-around">
                {/* First 4 products */}
                <img src="https://pixabay.com/photos/birds-asian-green-bee-eater-avian-7097604/" alt="" className='w-100' />
              </div>
            </div>

            <div className="carousel-item">
              <div className="d-flex justify-content-around">
                <img src="https://pixabay.com/photos/birds-asian-green-bee-eater-avian-7097604/" alt="" />

              </div>
            </div>

          </div>

          {/* Previous Button */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#categoryCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          {/* Next Button */}
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#categoryCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>

        </div>
      </div>
    </>
  )
}
