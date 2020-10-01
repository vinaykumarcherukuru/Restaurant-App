import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState';
import Zoom from 'react-reveal/Zoom' 

function ProductItem({ product }) {
    /*****************
     State
    ****************/
    const state = useContext(GlobalState)

    return (
        <Zoom>
            <div className="col-md-3 mb-4">
                <div className="h-100">
                    <img src={product.images && product.images['url']} className="card-img-top" alt="" style={{ height: 100 }} />
                    <div className="card-body">
                        <strong className="text-capitalize">{product.name}</strong>
                        <div className="price-wrap mt-2">
                            <span className="price ml-3">₹ {product.price} </span>
                        </div> {/* price-wrap.// */}
                        <p className="mt-2">
                            {
                                !product.available
                                    ? <a href="#" className="btn btn-outline-secondary btn-sm"> In Cart <i className="fa fa-shopping-cart"></i></a>
                                    :
                                    <a href="#" onClick={() => state.userAPI.addCart(product)} className="btn btn-outline-primary btn-sm"> Add to cart <i className="fa fa-shopping-cart"></i></a>
                            }
                        </p>
                    </div>
                </div>
            </div>
        </Zoom>
    )
}

export default ProductItem

