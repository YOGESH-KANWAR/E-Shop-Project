import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import productDetails from '../productDetails';

export default function newLaunchesSmartphone() {
    const [data, setData] = useState([])
    const [product1, setProduct1] = useState([])
    const [product2, setProduct2] = useState([])
    const [product3, setProduct3] = useState([])
    const [product4, setProduct4] = useState([])
    const [productCategory, setProductCategory] = useState([]);



    const fetchData = async () => {
        // await fetch("http://localhost:5000/offerData")
        await fetch(`${import.meta.env.VITE_API_URL}/offerData`)
            .then((res) => res.json())
            .then((data) => {
                const prodCategory = [];
                const podData = data.resData;
                podData.map((element) => {
                    prodCategory.push(element.category);
                    element.products.map((item, index) => {
                        if (index === 0) setProduct1(item);
                        if (index === 1) setProduct2(item);
                        if (index === 2) setProduct3(item);
                        if (index === 3) setProduct4(item);
                    })
                });
                setProductCategory(prodCategory);
            })
            .catch((err) => console.log(err.message));
    }
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <div className="conatainer3 container px-0 mt-5   ">
                <div className="  d-flex flex-column flex-md-row py-3 " style={{ backgroundColor: "rgba(190, 151, 214, 0.08)" }}>
                    <div className="box1">
                        <span className="">
                            <h3 className='ps-3 '>Nevly Lounched SmartPhones</h3>
                            <p>
                                <big className='ps-3'>Instan50% Discount</big>
                            </p>
                        </span>

                        <div className="card-group d-flex flex-column flex-sm-row ">
                            <div className="card border">
                                <Link to="/productDetails" state={{ productDetails: product1, productCategory: productCategory[0] }} >
                                    <img

                                        src={product1.image_url}
                                        // src="https://cdn.pixabay.com/photo/2020/03/09/08/44/redmi-note-8-4914992_640.png"
                                        className="card-img-top "
                                        alt="..." style={{}}
                                    />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title  h-50">{product1.name}</h5>
                                    <p className="card-text mb-1 mt-0">SmartPhone</p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">
                                            ${product1.price}.00 <del> $35,000 </del> 23% Off
                                        </small>
                                    </p>
                                </div>
                            </div>
                            <div className="card border ">
                                <Link to="/productDetails" state={{ productDetails: product2, productCategory: productCategory[0] }} >
                                    <img
                                        src={product2.image_url}
                                        className="card-img-top " style={{}}
                                        alt="..."
                                    />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title  h-50">{product2.name} </h5>

                                    <p className="card-text mb-1 mt-0">SmartPhone</p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">
                                            ${product2.price}.00 <del> $50,000 </del> 23% Off
                                        </small>
                                    </p>

                                </div>
                            </div>
                            <div className="card border ">
                                <Link to="/productDetails" state={{ productDetails: product3, productCategory: productCategory[0] }} >
                                    <img
                                        src={product3.image_url}
                                        className="card-img-top " style={{}}
                                        alt="..."
                                    />
                                </Link>
                                <div className="card-body ">
                                    <h5 className="card-title mb-0 h-50 ">{product3.name}</h5>
                                    <p className="card-text b mb-1 mt-0">SmartPhone</p>
                                    <p className="card-text ">
                                        <small className="text-body-secondary">
                                            ${product3.price}.00 <del> $35,000 </del> 23% Off
                                        </small>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box2 d-flex justify-content-center border ">
                        <Link to="/productDetails" state={{ productDetails: product4, productCategory: productCategory[0] }} >
                            <img src={product4.image_url} style={{ width: "290px" }} />
                        </Link>
                    </div>
                </div>

            </div>
            <div className=" container mt-0 border p-sm-0">
                <img
                    src="https://cdn.pixabay.com/photo/2017/03/13/17/26/ecommerce-2140603_640.jpg"
                    className='w-100 h-100'
                ></img>
            </div>
        </>
    )
}
