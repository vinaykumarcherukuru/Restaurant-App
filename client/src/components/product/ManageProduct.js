import React, { Fragment, useContext } from 'react' 

import { GlobalState } from '../../GlobalState';

function ManageProduct() {

    /*****************
    State
   ****************/
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [products] = state.productsAPI.products


    const productList = () => (
        <Fragment>
            {  categories.map(c => (
                
            
                <div className="mt-4 "> 
                    <h6 className="title-section text-uppercase">{c.name}</h6>  
                    <hr/>
                    <div className="">

                        <div className="card-body">
                        
                            <div className="row">
                                {
                                    products.filter(item => item.category_id === c._id).length > 0 ?
                                        (products.filter(item => item.category_id === c._id).map(
                                            product => (
                                               
                                                <div className="col-md-3 mt-3">
                                                   
                                                    <figure className="itemside mb-4">
                                                        <div className="aside"><img src={product.images && product.images['url']} className="border img-sm" /></div>
                                                        <figcaption className="info" style={{paddingLeft: 10, paddingRight: 2}} >
                                                            <a href="#" className="title">{product.name}</a>
                                                            <p className="price mb-2">₹ {product.price}</p>
                                                            <a href="#" className="btn btn-outline-primary btn-sm"><i className="fa fa-pencil" /> Edit </a>
                                                            <a href="#" className="btn btn-outline-primary btn-sm ml-2"> <i className="fa fa-trash" /> Delete </a>
                                                        </figcaption>
                                                    </figure>
                                                </div>

                                                
                                            )
                                        )

                                        )
                                        :
                                        <div class=" alert-danger">
                                            <strong>No products found.</strong>
                                        </div>

                                }
                            </div>
                            
                        </div>

                    </div>
                    </div> 
                ))
            } 
            </Fragment>

            )
    return (
            <div>
                {productList()}
            </div>
    )
}

export default ManageProduct
