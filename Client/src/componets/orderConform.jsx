import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function orderConform() {
    const location = useLocation();
    const navigate = useNavigate();
    const orderDetails = location.state.orderDetails;
    const userAdress = orderDetails.billingAddress;
    const orderProduct = orderDetails.orderProduct;
    const date = new Date(orderDetails.createdAt);
    const currentDate = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    const subTotal = orderProduct.price * orderProduct.quantity;
    const [hover, setHover] = useState(false);

    const handleClick = () => {
        navigate("/");
    }
    return (
        <>
            <div style={{ backgroundColor: "rgba(243, 247, 247, 1)" }}>
                <div className='border container ' style={{ backgroundColor: "#ebe9f0" }}>
                    <div className=' d-flex flex-wrap flex-lg-nowrap pb-5   ' >
                        <div className='w-100  pe-3 '>
                            <h2 className='my-3 mt-5 pt-0 fw-bold pt-lg-5'>Thank you for your purchase !</h2>
                            <p>Your order  will be processed within 24 hours during working days, we will notify you by email once order has been shipped</p>
                            <h5>Billing address</h5>
                            <table className='table bg-transparent'>
                                <tbody>
                                    <tr>
                                        <th className='bg-transparent'>Name</th>
                                        <td className='bg-transparent'>{userAdress.name} {userAdress.lastName}</td>
                                    </tr>
                                    <tr>
                                        <th className='bg-transparent'>phone</th>
                                        <td className='bg-transparent'>{userAdress.mobileNo}</td>
                                    </tr>
                                    <tr>
                                        <th className='bg-transparent'>Email</th>
                                        <td className='bg-transparent'>{userAdress.email}</td>
                                    </tr>
                                    <tr>
                                        <th className='bg-transparent'>adresss</th>
                                        <td className='bg-transparent'>{userAdress.address}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div className='w-100 p-4 mt-3   border-secondary rounded-top-5 ' style={{ borderTop: "15px solid", background: "linear-gradient(0deg,rgba(250, 250, 250, 1) 0%, rgba(214, 212, 210, 1) 100%)" }}>
                            <h4 className='mt-1 mb-3 fw-bold'>Order summery</h4>
                            <table className='table  mb-3  '>
                                <tbody className=' '>
                                    <tr className='p-3 '>
                                        <td className='border-0 bg-transparent   pb-0'>Date </td>
                                        <td className='border-0  pb-0 bg-transparent'>Order Number </td>
                                        <td className='border-0 pb-0 bg-transparent'>Payment Method</td>
                                    </tr>
                                    <tr>
                                        <th className='pt-0 bg-transparent'>{currentDate}</th>
                                        <th className=' pt-0 bg-transparent'>{orderDetails.orderId}</th>
                                        <th className=' pt-0 bg-transparent'> {orderProduct.payMethod}</th>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='d-flex'>
                                <figure className='border rounded-3 w-25 overflow-hidden '>
                                    <img src={`productImage/${orderProduct.imageUrl}`} alt=""
                                        className='w-100' />
                                </figure>
                                <span className='ps-3'>
                                    <h6>{orderProduct.productName}</h6>
                                    <h5 className='mb-0'>₹{orderProduct.price}</h5>
                                    <p className="m-0">Qty: {orderProduct.quantity}</p>
                                    <span className='text-muted'>{orderProduct.payMethod}</span>
                                </span>
                            </div>
                            <div className='border-top border-bottom py-3 mb-2'>
                                <div className=' '>
                                    <span className='w-50 d-inline-block'>Sub Total</span >
                                    <span className="w-50  d-inline-block text-end">$ {subTotal}.00</span>
                                </div>
                                <div className=' '>
                                    <span className='w-50 d-inline-block'>Shipping</span >
                                    <span className="w-50  d-inline-block  text-end">00.00</span>
                                </div>
                                <div className=' '>
                                    <span className='w-50 d-inline-block'>Tax</span >
                                    <span className="w-50  d-inline-block  text-end">00.00</span>
                                </div>
                            </div>
                            <div className=' '>
                                <span className='w-50 d-inline-block'><b>Total</b></span >
                                <span className="w-50  d-inline-block  text-end"><b>₹{orderProduct.totalPrice}.00 </b></span>
                            </div>
                        </div>

                    </div>
                    <div className='text-center my-3 my-md-5 w-100 border'>
                        <button
                            className='btn  text-white w-25 fw-semibold'
                            style={{ backgroundColor: hover ? "#3b127a" : "#6428bf" }}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            onClick={handleClick}
                        > Continue Shopping</button>
                    </div>
                </div>
            </div>
        </>
    )
}
