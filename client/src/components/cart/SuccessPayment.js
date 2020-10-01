import React from 'react'
import Zoom from 'react-reveal/Zoom'

function SuccessPayment(props) {
    const { tmpcart, discount, gst, total, cart, cartPrice } = props
    return (
        <Zoom>
            <div id="success_Modal" className="modal show">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="col-md-12">
                                <div className="cards">
                                    <article className="card-body">
                                        <span className="close" data-dismiss="modal">
                                            <i className="fa fa-times title"></i>
                                        </span>
                                        <header className="mb-4">
                                            <h4 className="card-title">Your Order placed successfully.</h4>

                                        </header>
                                        <div className="row">
                                            {
                                                tmpcart && tmpcart.map(product => (
                                                    <div className="col-md-4">
                                                        <figure className="itemside  mb-3">
                                                            <div className="aside"><img src={product.images.url} className="border img-xs" /></div>
                                                            <figcaption className="info">
                                                                <p>{product.name} </p>
                                                                <span>{product.quantity}x ₹{product.orginalPrice} = Total: ₹{product.price} </span>
                                                            </figcaption>
                                                        </figure>
                                                    </div>

                                                )
                                                )}

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
                                        </dl>
                                    </article> {/* card-body.// */}
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </Zoom>
    )
}

export default SuccessPayment
