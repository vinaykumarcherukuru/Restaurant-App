import React, { useContext, useState, useEffect } from 'react'

import { GlobalState } from '../../GlobalState';
import Cart from '../cart/Cart';
import Fade from 'react-reveal/Fade'

import ProductItem from '../product/ProductItem';

function Home() {
    const state = useContext(GlobalState)

    const [categories] = state.categoriesAPI.categories
    const [products, setProducts] = state.productsAPI.products
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (products.length > 0)
            setIsLoading(false)
    },[products])

    // useEffect(() => { 
    //     console.log(state.productsAPI.products)
    //     let group = state.productsAPI.products.reduce((r, a) => { 
    //         r[a.category_id] = [...r[a.category_id] || [], a];
    //         return r;
    //        }, {});
    //        console.log("group", group); 
    // }, [])



    const groupBy = (arr, key) => {
        return (arr || []).reduce((acc, x = {}) => ({
            ...acc,
            [x[key]]: [...acc[x[key]] || [], x]
        }), {})
    }
    return (
        <> 
            <section className="section-content padding-y">
                <div className="container-fluid">
                    <div className="row">
                        {/* Left Menu */}
                        <aside className="col-md-2 ml-4">
                            <article className="filter-group">
                                <div className="card-body">                                     
                                        <ul className="list-menu menu-category">
                                            {/* {
                                            console.log(groupBy(products, 'category_id'))
                                        } */}
                                            {categories && categories.map(item =>
                                                (
                                                    <li key={item._id}>
                                                        <a href="#" onClick={() => {setIsLoading(true);state.productsAPI.productsByCategory(item._id);setIsLoading(false) }}><strong className="text-capitalize">{item.name}</strong> </a>
                                                    </li>
                                                )
                                            )
                                            }
                                        </ul>
                                     
                                </div>

                            </article>
                        </aside>

                        {/* Middle Page */}
                        <main className="col-md-6 mr-5">
                            {isLoading && <img src="https://i.ibb.co/KcnkCZb/Loading-Icon.gif" style={{ height: 250 }} />}
                            {
                                products && products.length > 0 ?
                                    (
                                        <div className="row">
                                            {
                                                products.map(product => {
                                                    return <ProductItem key={product._id} product={product} />
                                                })
                                            }
                                        </div>

                                    ) : <Fade bottom cascade><div className="row text-danger mt-5"> {!isLoading && <strong>No Food Items found in this Category</strong>}</div></Fade>
                            }
                        </main>

                        {/* Right Menu  */}
                        <div className="col-md-2 border-left">
                            <Cart />
                        </div>
                    </div>

                </div>
            </section>
        </>

    )
}

export default Home