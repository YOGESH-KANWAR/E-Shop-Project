import React, { useEffect, useRef, useState } from "react";
import Elogo from '../assets/shopping-2477511.png'
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiAllProducts, categoryProduct, apiData } from "../features/slice";


export default function header() {
    const [prodData, setProdData] = useState([]);
    const [storeCategory, setStoreCategory] = useState("");
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const dispatch = useDispatch();
    let catProduct = "";
    const fetchData = async () => {
        const res = await fetch("http://localhost:3000/api");
        const data = await res.json();
        setProdData(data.resData);
    }
    useEffect(() => {
        fetchData();
    }, []);

    let storeProducts = [];
    let categories = [];
    useEffect(() => {
        if (!prodData) return;
        prodData.forEach((e) => {
            let prod = e.products;
            categories.push(e.category);
            prod.forEach((productItem) => {
                storeProducts.push(productItem);
                //storeCategory.push(ProdCategory);
            });
            setStoreCategory(categories);
        });
        dispatch(apiData(prodData));
        dispatch(apiAllProducts(storeProducts));
        dispatch(categoryProduct(storeCategory));
    }, [prodData, dispatch]);

    const handleSearch = () => {
        if (!search) {
            setResult([]);
            return;
        }
        const filtered = storeCategory.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));
        setResult(filtered);
    }
    const handleSelectProduct = (product) => {
        setSearch(product);
        setResult([]);
    };

    // *********************
    const searchRef = useRef(null);
    //search bar list hide ather place clicked
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setResult([]); // 👉 list close
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setResult([]);
            }
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <>
            <div className="container-lg position-relative ">
                <div className=" row flex-column flex-lg-row ">
                    <div className="col-12 d-flex justify-content-end col-lg-3 justify-content-lg-center ">
                        <h2 className="p-2 fw-bold fst-italic" style={{ color: "#6428bf" }}>
                            <img className="p-0 m-0" src={Elogo} width="55px" height="45px" />
                            <u>Shop</u>
                        </h2>
                    </div>
                    <div className="myBgColor p-0 col-12 col-lg-6 d-flex flex-wrap align-items-center position-relative"
                        ref={searchRef}
                    >
                        <input type="search"
                            className="form-control  w-100 h-50 m-2 rounded-5 border "
                            placeholder="Search For Product" aria-label="Username" aria-describedby="addon-wrapping"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} onKeyDown={handleSearch}
                        />
                        <div className="position-absolute w-100 top-0 mt-5 bottom-5" style={{ zIndex: 1020 }}>
                            <div className="">
                                {
                                    result.map((item, index) => (
                                        <ul className="list-group"
                                            key={index}
                                        >
                                            <li class="list-group-item border-1 rounded-0"
                                                style={{}}>
                                                <Link to="/categoryProduct" state={{ category: item }} className="nav-link"
                                                    // state={(catProduct = item)}
                                                    onClick={() => handleSelectProduct(item)}
                                                >{item}
                                                </Link>
                                            </li>
                                        </ul>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                    <div className=" align-items-center justify-content-end d-none d-lg-block d-lg-flex col-lg-3 ">
                        <h6 className="p-2 text-muted ">
                            <NavLink to="#" className="text-dark text-decoration-none">Support</NavLink>
                        </h6>
                        <h6 className="p-2 text-muted ">
                            <NavLink to="#" className="text-dark text-decoration-none">About Us</NavLink>
                        </h6>
                        <h6 className="p-2 pe-0 text-muted ">
                            <NavLink to="#" className="text-dark text-decoration-none">FAQs</NavLink>
                        </h6>
                    </div>
                </div>

            </div >



        </>
    )
};
