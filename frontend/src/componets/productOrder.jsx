import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function productOrder() {
    const [qtyValue, setQtyValue] = useState("");
    const [Email, setEmail] = useState("");
    const [qty, setQty] = useState("1");
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const productDetails = location.state.productDetail;
    const QtyTotal = (val) => {
        setQty(val);
        let price = productDetails.price;
        setQtyValue(price * val);
    }

    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        state: "",
        city: "",
        mobileNo: "",
        email: "",
        address: "",

    });

    useEffect(() => {
        setQtyValue(productDetails.price);
    }, []);

    const hendalSubmit = (e) => {
        e.preventDefault();
        const OrdProduct = {
            productId: productDetails.id,
            productName: productDetails.name,
            quantity: qty,
            payMethod: "Cash on Delivery",
            price: productDetails.price,
            totalPrice: qtyValue,
            imageUrl: productDetails.image_url,

        }
        const userAdress = { ...formData };
        //const userloginId = JSON.parse(sessionStorage.getItem("loginUser"));
        const UID = location.state.userId;
        const ordId = "ORD" + Date.now();
        const orderDetails = {
            orderId: ordId,
            userId: UID,
            orderProduct: OrdProduct,
            billingAddress: userAdress,
        }
        fetch(`${import.meta.env.VITE_API_URL}/orderProduct`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderDetails)
            }
        )
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                navigate("/orderConform", { state: { orderDetails: data.resData } });
            })
            .catch((err) => console.log(err));

    }
    return (
        <>
            <div id="productOrder" className="pb-5" style={{ backgroundColor: "rgba(243, 247, 247, 1)" }}>
                <form onSubmit={hendalSubmit}>
                    <div className='container px-0  d-flex flex-wrap justify-content-center ' >
                        <div className='productBox px-2 px-sm-3 pb-5' style={{ backgroundColor: "#ebe9f0" }}>
                            <div className='row row-cols-2 pt-3'>
                                <figure className='col-4 h-25'>
                                    <img src={productDetails.image_url} className='w-100' />
                                </figure>
                                <div className=' col-8 pt-md-4'>
                                    <h5 className='  pt-3  fw-bold'>{productDetails.name}</h5>
                                    <h6 className='fw-bold'>${productDetails.price}.00</h6>
                                    <h6 className='fw-bold'>{productDetails.rating}<span className='text-success'>★</span></h6>
                                    <h6>Brand -<span className='fw-bold'> {productDetails.brand}</span></h6>
                                </div>
                            </div>
                            <div className='d-flex my-3 border-bottom'>
                                <span className='w-50 w-50'>
                                    <label htmlFor="" className='form-label d-inline-block fw-bold  '>Quantity :</label>
                                    <select name="" id="" className=' ms-2 d-inline       form-select' style={{ width: "70px" }}
                                        onChange={(e) => QtyTotal(e.target.value)}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </span>
                                <span className='w-50 '>
                                    <h5 className='text-end pe-3 pt-2 '>${qtyValue}.00</h5>
                                </span>
                            </div>
                            <p className='fw-bold text-muted text-end pe-3  '>Free Delivery</p>
                            <div>
                                <select className='form-select'

                                    value={formData.payMethod}
                                    onChange={(e) => setFormData({ ...formData, payMethod: e.target.value })}
                                >

                                    <option value="Case in Delevry">Case on Delevry</option>
                                    <option value="Online Payment">Online Payment  </option>
                                </select>
                            </div>
                            <div className='my-3 border-bottom pb-3'>
                                <span className='w-50 d-inline-block fw-bold fs-5 text-muted'>Total Pay </span>
                                <span className='w-50 d-inline-block text-end px-3 fw-bold'>${qtyValue}.00</span>
                            </div>

                            <div>

                                <h4 className="my-3">Shipping Adress</h4>
                                <div className='d-flex d-block my-3'>
                                    <span className=' w-50 me-2'>
                                        <input text="text" required placeholder="Name" className='form-control '
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    </span>
                                    <span className=' w-50 ms-2'>
                                        <input type="text" required placeholder="Last Name" className='form-control'
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                                    </span>
                                </div>
                                <span className='d-block d-flex'>
                                    <input text="text" required placeholder='Mobile No' className='form-control  w-50 d-inline-block me-2'
                                        onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })} />
                                    <input text="email" required placeholder='Email' className='form-control w-50 d-inline-block ms-2' onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </span>
                                <div className='d-flex mt-3'>
                                    <span className='w-50 me-2'>
                                        <select required className='form-select ' onChange={(e) => setFormData({ ...formData, state: e.target.value })} >
                                            <option value="">State</option>
                                            <option value="chhattisgarh" >chhattisgarh</option>
                                            <option value="maharasht">maharasht</option>
                                            <option value="madyaoradesh">madyaoradesh</option>
                                            <option value="udisha">udisha</option>
                                            <option value="utarpredesh">utarpredesh</option>
                                            <option value="utrakhand">utrakhand</option>
                                        </select>
                                    </span>
                                    <span className='w-50 ms-2'>
                                        <select required className='form-select' onChange={(e) => setFormData({ ...formData, city: e.target.value })}>City
                                            <option value="">City</option>
                                            <option value="durh">durg</option>
                                            <option value="bhilai">bhilai</option>
                                            <option value="raipur">raipur</option>
                                            <option value="rajnandgaow">rajnandgaow</option>
                                        </select>
                                    </span>
                                </div>
                                <label className='fw-bolder mt-2 mb-2'>Adress</label>
                                <textarea required className='form-control' placeholder="Address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                <span className='text-center d-block mt-4'>
                                    <button type='submit' className='buttonHover btn w-25 text-white fw-semibold' style={{ backgroundColor: "#6428bf" }}
                                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#3b127a")}
                                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#6428bf")}
                                    >Confirm</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </>
    )
}
