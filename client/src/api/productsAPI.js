import { useState, useEffect } from 'react'
import axios from 'axios';

function ProductsAPI() {
    const [products, setProducts] = useState([])
    const [productsByCategory, setProductsByCategory] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNWUyZThmZTA3MjFmODFhNDdjOTA0YiIsImlhdCI6MTYwMDY3MTU0NywiZXhwIjoxNjAwNzU3OTQ3fQ.DOLA_bFSsOWs91GenlwlbKu-UxVkiHAO2LmrVNp6bbw'
    const config = {
        headers: {
            'content-type': 'application/json',
            'Authorization': `${access_token}`
        }
    }

    const getProducts = async () => {
        const res = await axios.get("/api/products")
        setProducts(res.data.products)
        setProductsByCategory(res.data.products)
    }

    const getProductsByCategory = (id) => {
        const response = products.filter(item => item.category_id === id) 
        setProductsByCategory(response)
    }

    const createProduct = async (newProduct) => { 
        const response = await axios.post("/api/products/", newProduct, config)
        return response.data
    }

    return {
        products: [productsByCategory, setProductsByCategory], //[products, setProducts],
        productsByCategory: getProductsByCategory,
        create: createProduct
    }
}

export default ProductsAPI
