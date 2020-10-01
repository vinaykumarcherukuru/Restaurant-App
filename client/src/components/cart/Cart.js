import React, { Fragment, useContext, useState, useEffect, useRef } from 'react'
import { GlobalState } from '../../GlobalState'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import axios from 'axios'
import Modal from 'react-modal';



const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

function Cart() {

    /*****************
      State
     ****************/
    const state = useContext(GlobalState)
    const [token] = state.token
    const [callback, setCallback] = state.userAPI.callback
    const [cart, setCart] = state.userAPI.cart
    const [history] = state.userAPI.history

    const [orderDetails, setOrderDetails] = useState([])
    const [successmodal, setSuccessmodal] = useState(false);
    const [failuremodal, setFailuremodal] = useState(false);
    const [cancelmodal, setCancelmodal] = useState(false);

    const [total, setTotal] = useState(0)

    const [cartPrice, setCartPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [gst, setGst] = useState(0)

    const [paymentType, SetPaymentType] = useState(false);

    /*****************
      Event Handlers
     ****************/

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            // Total Cart price
            setCartPrice(total)


            var price = total * 1;
            // Discount Amount
            var discount = Math.round(((10 / 100) * total)) // 10%
            setDiscount(discount)
            //setDiscount(100)

            // GST Calculation 

            var gst = Math.round((total - discount) * 0.18);
            setGst(gst);

            var totalAmount = ((price - discount) + gst)
            setTotal(totalAmount)

            // setTotal(total)
        }

        getTotal()
    }, [cart])

    const closeSuccessModal = () => {
        setSuccessmodal(false);
    }

    const closeFailureModal = () => {
        setFailuremodal(false);
    }

    const closeCancelModal = () => {
        setCancelmodal(false);
    }




    const updateCart = async (cart) => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: token }
        })
    }

    const changeQuantity = (id, value) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity = value
                item.price = item.orginalPrice * item.quantity

                setCart([...cart])
                updateCart(cart)
            }
        })
    }

    const removeProduct = id => {
        if (window.confirm("Do you want to delete this product?")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                    return;
                }
            })

            setCart([...cart])

            updateCart(cart)

        }
    }


    /*********************************
      Payumoney Payment Gateway
     ********************************/
    const PayumoneyGateway = async () => {
        // Data to be Sent to API to generate hash.
        var data = {
            'txnid': 'txnid' + new Date().getTime(),
            'email': 'vinay.niki@gmail.com',
            'firstname': 'Vinay Kumar Cherukuru',
            'phone': '8142534153',
            'productinfo': 'Customer Products',
            'amount': 1 //`${total}`
        }
        let self = this;
        // API call to get the Hash value         

        const res = await axios.post('/api/payment/payumoney', data, {
            headers: { Authorization: token }
        })

        //Create a "payUmoneyParams" object that is to be passed to LAUNCH method of Bolt  
        var payUmoneyParams = res.data.msg;
        payUmoneyParams.surl = 'https://dotnettechtips.com/'
        payUmoneyParams.furl = 'https://dotnettechtips.com/'

        window.bolt.launch(payUmoneyParams, {
            responseHandler: async (BOLT) => {
                //  this is for capturing the status of the transaction  

                // your payment response Code goes here, BOLT is the response object

                if (BOLT.response.txnStatus === "SUCCESS") {
                    const { payuMoneyId, address, amount, bankcode, cardnum, PG_TYPE, mode, bank_ref_num, name_on_card, net_amount_debit, status, txnid, txnStatus } = BOLT.response

                    const response = await axios.post('/api/payment', { cart, payuMoneyId, address, amount, bankcode, cardnum, PG_TYPE, mode, bank_ref_num, name_on_card, net_amount_debit, status, txnid, txnStatus }, {
                        headers: { Authorization: token }
                    })


                    setOrderDetails(response.data.msg.cart)


                    // history.forEach(item=>{
                    //     if(item.paymentId === response.data.msg.paymentId) setOrderDetails(item)
                    // })


                    setSuccessmodal(true)

                    setTimeout(function () {
                        setCart([])
                        updateCart([])
                        setCallback(!callback)
                    }, 5000);

                }

                if (BOLT.response.txnStatus === "FAILED") {

                }

                if (BOLT.response.txnStatus === "CANCEL") {
                    setCancelmodal(true)
                }
            },
            catchException: async (BOLT) => {
                // the code you use to handle the integration errors goes here
                // Make any UI changes to convey the error to the user   



                // "amount: should be numeric"
                // "txnid: mandatory param is missing"
                // "Error in adding payment"

            }
        })
    }

    const showTransactionStatusModal = () => (
        <Zoom>
            <div className="cards">
                <article className="card-body">
                    <span className="close" onClick={closeSuccessModal}>
                        <i className="fa fa-times title"></i>
                    </span>
                    <header className="mb-4">
                        <h4 className="card-title">Your Order placed successfully.</h4>

                    </header>
                    <div className="row">
                        {
                            orderDetails && orderDetails.map(item => (
                                <div className="col-md-4">
                                    <figure className="itemside  mb-3">
                                        <div className="aside"><img src={item.images.url} className="border img-xs" /></div>
                                        <figcaption className="info">
                                            <p>{item.name} </p>
                                            <span>{item.quantity}x ₹{item.orginalPrice} = Total: ₹{item.price} </span>
                                        </figcaption>
                                    </figure>
                                </div>

                            )
                            )

                        }

                    </div>
                </article>
                <article className="card-body border-top">
                    <dl className="row">
                        <dt className="col-sm-10">Subtotal: <span className="float-right text-muted">{cart.length === 1 ? (cart.length + ' ' + 'item') : (cart.length + ' ' + 'items')} </span></dt>
                        <dd className="col-sm-2 text-right"><strong>₹{cartPrice}</strong></dd>
                        <dt className="col-sm-10">Discount: <span className="float-right text-muted">10% offer</span></dt>
                        <dd className="col-sm-2 text-danger text-right"><strong>- ₹{discount}</strong></dd>
                        <dt className="col-sm-10">GST (<span className="text-muted small">CGST + SGST</span>): <span className="float-right text-muted">18%</span></dt>
                        <dd className="col-sm-2 text-right"><strong>+ ₹{gst}</strong></dd>
                        <dt className="col-sm-10">Total:</dt>
                        <dd className="col-sm-2 text-right"><strong className="h5 text-dark">₹{total}</strong></dd>
                        <dt className="col-sm-10">Restaurant Offer:</dt>
                        <dd className="col-sm-2 text-right"><strong className="h5 text-danger">- ₹{total - 1}</strong></dd>
                        <dt className="col-sm-10">Amount Paid:</dt>
                        <dd className="col-sm-2 text-right"><strong className="h5 text-dark">₹1</strong></dd>
                    </dl>
                </article> {/* card-body.// */}
            </div>


        </Zoom>
    )

    const showTransactionFailModal = () => (
        <Zoom>
            <div className="cards">
                <article className="card-body">
                    <span className="close" onClick={closeFailureModal}>
                        <i className="fa fa-times title"></i>
                    </span>
                    <header className="mb-4">
                        <h4 className="card-title text-danger">Transaction Failed.</h4>
                    </header>
                    <div className="row">
                        <h6>Something went wrong. Please try again!</h6>
                    </div>
                </article>
            </div>
        </Zoom>
    )

    const showTransactionCancelModal = () => (
        <Zoom>
            <div className="col-md-12">
                <article className="card-body">
                    <span className="close" onClick={closeCancelModal}>
                        <i className="fa fa-times title"></i>
                    </span>
                    <header className="mb-4">
                        <h4 className="card-title text-danger">Transaction Cancelled.</h4>
                    </header>
                    <div className="row">
                        <h6>Order not processed!</h6>
                    </div>
                </article>
            </div>
        </Zoom>
    )


    /*****************
      Views
     ****************/

    if (cart.length === 0)
        return <h4> Your cart is empty </h4>


    return (
        <>
            <div className="form-inline">
                <h4> Review cart </h4>
                <img className="ml-3" src="https://dotnettechtips.com/Content/Images/look-here.gif" style={{ height: 32 }} alt="" />
            </div>
            <div className="row">
                <table className="table table-borderless">
                    <thead className="text-muted">
                        <tr className="small text-uppercase">
                            <th scope="col">Food Item</th>
                            <th scope="col" width={120}>Quantity</th>
                            <th scope="col" width={120}>Price </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart && cart.map(product => (
                                <Zoom>
                                    <tr key={product._id}>
                                        <td>
                                            <figure className="itemside">
                                                <div className="aside"><img src={product.images.url} className="border img-xs" /></div>
                                                <figcaption className="info text-capitalize">
                                                    <p style={{ minWidth: 120 }}>{product.name}</p>
                                                    <span className="text-muted small">₹{product.orginalPrice} x {product.quantity}</span>
                                                </figcaption>
                                            </figure>
                                        </td>
                                        <td>
                                            <select value={product.quantity} onChange={(e) => changeQuantity(product._id, e.target.value)} className="form-control form-control-sm" value={product.quantity}>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div className="price-wrap">
                                                <var className="price">₹{product.price} </var>

                                            </div>
                                        </td>
                                        <td className="text-right d-none d-md-block">
                                            <i className="fa fa-remove" style={{ fontSize: 24, color: 'red', cursor: 'pointer' }} onClick={() => removeProduct(product._id)} />
                                        </td>
                                    </tr>
                                </Zoom>
                            ))
                        }
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan="4">
                                <hr />
                                <div className="float-right" style={{ width: '80%' }}>
                                    <dl className="dlist-align">
                                        <dt>Amount:</dt>
                                        {/* <dd className="text-right text-dark b">₹{cart.reduce((prev, next) => prev + next.price, 0)}</dd> */}
                                        <dd className="text-right text-dark ">₹{cartPrice}</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                        <dt style={{ width: 110 }}>Discount(<span className="text-muted small">10%</span>):</dt>
                                        <dd className="text-right text-danger ">- ₹{discount}</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                        <dt style={{ width: 175 }}>GST (<span className="text-muted small">CGST + SGST = 18%</span>):

                                            </dt>
                                        <dd className="text-right text-dark ">+ ₹{gst}</dd>
                                    </dl>
                                    <hr />
                                    <dl className="dlist-align">

                                        {/* <dd className="text-right b text-dark "><strong>₹ {cart.reduce((prev, next) => prev + next.price, 0) - 100} </strong></dd> */}
                                        <dd className="text-right text-dark ">Total: &nbsp;<strong>₹{total} </strong></dd>


                                    </dl>
                                    <dl className="dlist-align">

                                        {/* <dd className="text-right b text-dark "><strong>₹ {cart.reduce((prev, next) => prev + next.price, 0) - 100} </strong></dd> */}
                                        <dd className="text-right text-dark ">Restaurant Offer: &nbsp;<strong className="text-danger">- ₹{total - 1} </strong></dd>


                                    </dl>

                                    <dl className="dlist-align">

                                        {/* <dd className="text-right b text-dark "><strong>₹ {cart.reduce((prev, next) => prev + next.price, 0) - 100} </strong></dd> */}
                                        <dd className="text-right text-dark ">Pay Amount: &nbsp;<strong>₹1 </strong></dd>


                                    </dl>

                                    {/* <dl className="dlist-align pull-right">
                                        <button onClick={() => PayumoneyGateway()} className="btn btn-sm btn-primary  mt-4 " > Pay with PayUmoney  </button>
                                    </dl>  */}
                                </div>
                            </td>
                        </tr>
                        <tr className="border-top">
                            <td>
                                <h6 className="ml-3"> Choose Payment Type</h6> 
                            </td>
                            <td colSpan="3">
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" name="radio_payment" className="form-check-input" onClick={() => SetPaymentType(true)} />Offline
                                         </label>
                                    <label className="form-check-label ml-3">
                                        <input type="radio" name="radio_payment" defaultChecked className="form-check-input" onClick={() => SetPaymentType(false)} />Online
                                         </label>
                                </div> 
                            </td>
                            
                        </tr> 
                        {!paymentType &&
                        <tr>
                            <td colSpan="3"> 
                                <div className="pull-right">
                                    <button onClick={() => PayumoneyGateway()} className="btn btn-sm btn-primary mt-2" > Pay with PayUmoney  </button>
                                </div>
                            </td>
                        </tr>
                    }
                        <tr>
                            <td colSpan="4">
                                <div className="ml-3">
                                    {/* <h6>Choose Payment Type</h6>
                                    <div className="form-check-inline">
                                        <label className="form-check-label">
                                            <input type="radio" name="radio_payment" className="form-check-input" onClick={() => SetPaymentType(true)} />Offline
                                         </label>
                                        <label className="form-check-label ml-3">
                                            <input type="radio" name="radio_payment" defaultChecked className="form-check-input" onClick={() => SetPaymentType(false)} />Online
                                         </label>
                                    </div> */}
                                    {/* <small class="form-text text-muted">Complete transaction by making payment with customer's <strong>Credit Card/Debit Card/Wallet</strong></small>
                                    <hr /> */}

                                    {paymentType &&
                                        <>
                                            <form className="ml-2">
                                                <small class="form-text text-muted b">Complete transaction by making the payment with customer's <strong>Credit Card/Debit Card/Wallet</strong></small>
                                                {/* <hr /> */}
                                                <br/>
                                                <h6>Cards</h6>
                                                <div className="form-check-inline">
                                                    <label className="form-check-label" htmlFor="radio1">
                                                        <input type="radio" className="form-check-input" id="radio1" name="optradio" defaultValue="option1" defaultChecked />Credit Card
                                        </label>
                                                </div>
                                                <div className="form-check-inline">
                                                    <label className="form-check-label" htmlFor="radio2">
                                                        <input type="radio" className="form-check-input" id="radio2" name="optradio" defaultValue="option2" />Debit Card
                                     </label>
                                                </div>
                                                <br /><br />
                                                <h6>Banks</h6>
                                                <div className="form-check-inline">
                                                    <label className="form-check-label" htmlFor="radio2">
                                                        <input type="radio" className="form-check-input" id="radio2" name="optradio" defaultValue="option2" />Internet Banking                                     </label>
                                                </div>
                                                <br /><br />
                                                <h6>Wallets</h6>
                                                <div className="form-check-inline">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" />Paytm
                                         </label>
                                                </div>
                                                <div className="form-check-inline">
                                                    <label className="form-check-label" htmlFor="radio2">
                                                        <input type="radio" className="form-check-input" id="radio2" name="optradio" defaultValue="option2" />GPay
                                     </label>
                                                </div>
                                                <div className="form-check-inline">
                                                    <label className="form-check-label" htmlFor="radio2">
                                                        <input type="radio" className="form-check-input" id="radio2" name="optradio" defaultValue="option2" />PhonePay
                                     </label>
                                                </div>
                                                <br /><br />
                                                <h6>Cash on delivery</h6>
                                                <div className="form-check-inline">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" />COD
                                         </label>
                                                </div>
                                            </form>
                                            <button className="btn btn-sm btn-primary mt-4 pull-right" > Confirm Order </button>
                                        </>
                                    }

                                </div>
                            </td>
                        </tr>

                    </tfoot>
                </table>



            </div>




            <Modal
                isOpen={successmodal}
                onRequestClose={closeSuccessModal}
                style={customStyles} >

                {showTransactionStatusModal()}
            </Modal>

            <Modal
                isOpen={failuremodal}
                onRequestClose={closeFailureModal}
                style={customStyles} >

                {showTransactionFailModal()}
            </Modal>

            <Modal
                isOpen={cancelmodal}
                onRequestClose={closeCancelModal}
                style={customStyles} >

                {showTransactionCancelModal()}
            </Modal>

        </>
    )
}

export default Cart
