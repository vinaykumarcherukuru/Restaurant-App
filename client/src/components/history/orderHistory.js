import React, { Fragment, useContext } from 'react'
import ProductsAPI from '../../api/productsAPI'
import { GlobalState } from '../../GlobalState'
import Zoom from 'react-reveal/Zoom'



function OrderHistory() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history

    const paymentMode = (value) =>  {
        let paymode="";
        switch(value){
            case 'CC' : return paymode = 'Credit Card';
            case 'DC' : return paymode = 'Debit Card';
            case 'NB' : return paymode ='Net Banking';
            case 'P' : return paymode = 'Paytm';
            case 'G' : return paymode = 'Gpay';
            case 'Ph' : return paymode = 'PhonePay';
            default : return paymode ='';
        }
         
    }
    

    const purchaseHistory = () => (
        <div className="mt-5">
            <h4>Total Orders found : {history.length}</h4>

            { history && history.map(item => (
                <article className="order-group mt-5" key={item.paymentId}>

                    {/* <div >
                        <span className="d-inline-block mr-3 b">Order ID: {'ORD' + item.paymentId} </span>
                         <span className="ml-5">Date: {new Date(item.createdAt).toLocaleString().toString()}</span> 
                         <hr />
                       </div> */}
                    

                    <div>
                        <span className="b">Order ID: {'ORD' + item.paymentId} </span>
                        <hr />
                    </div>
                    <div className="row">
                        <div className="col">
                            Payment Mode: {paymentMode(item.PaymentMode)}
                        </div>
                        {/* <div className="col">
                            Date #: {new Date(item.createdAt).toLocaleString().toString()}
                        </div> */}
                        <div className="col">
                            Item Quantity : {item.cart.length}
                        </div> 
                        
                        <div className="col"> 
                        Total (<span className="text-muted text-small">including tax</span>) : ₹{item.amount}
                        </div>
                        <div className="col">
                            Date #: {new Date(item.createdAt).toLocaleString().toString()}
                        </div>
                                         
                    </div>

                    <Zoom>
                        <div className="card-body row mt-2">

                            {
                                item.cart && item.cart.map((product, index) => (
                                    <figure className="itemside col-md-3 mb-3" key={index}>
                                        <div className="aside"><img src={product.images.url} className="img-sm border" /></div>
                                        <figcaption className="info align-self-center">
                                            <p className="title">{product.name}</p>
                                            <span className="text-muted">₹{product.orginalPrice} x {product.quantity} </span>
                                        </figcaption>
                                    </figure>

                                ))
                            }

                        </div>
                    </Zoom>
 
                </article>

            ))
            }


        </div>
    )

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-9">

                    {purchaseHistory()}

                </div>
            </div>
        </div>

    )
}

export default OrderHistory
