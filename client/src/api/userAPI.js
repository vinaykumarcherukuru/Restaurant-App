import axios from 'axios';
import { useState, useEffect } from 'react';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setCart(res.data.cart)

                } catch (err) {
                    console.log(err)
                }
            }
            getUser()
        }
    }, [token])

    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                try {
                   /* if(isAdmin)
                        {
                            const res = await axios.get('/api/payment', {
                                headers: { Authorization: token }
                            })
        
                            setHistory(res.data)
                        }
                        else
                        {
                            const res = await axios.get('/user/history', {
                                headers: { Authorization: token }
                            })
        
                            setHistory(res.data)
                        }   */
                        
                        const res = await axios.get('/user/history', {
                            headers: { Authorization: token }
                        })
    
                        setHistory(res.data)

                } catch (err) {
                    console.log(err)
                }
            }
            getHistory()
        }
    }, [token, callback]) //[token, isAdmin])

    const addCart = async (product) => {
        const check = cart.every(item => {
            return item._id !== product._id
        })

        if (check) {
            setCart([...cart, { ...product, orginalPrice: product.price, quantity: 1 }])
            await axios.patch('/user/addcart', { cart: [...cart, { ...product, orginalPrice: product.price, quantity: 1 }] }, {
                headers: { Authorization: token }
            })
        }
        else {
            // 1. Make a shallow copy of the items
            const existingCart = [...cart]
            // 2. Find index of current updated item by ID
            const index = cart.findIndex(c => c._id === product._id);
            // 3. Prevent user to add same product to cart morethan 5
            if (existingCart[index].quantity < 5) {
                // 3. Modifiy the value of property by Index
                existingCart[index].quantity++;
                existingCart[index].price = existingCart[index].quantity * existingCart[index].orginalPrice;
                // 4. Update State array with new changes
                setCart(existingCart)
            }
            else {
                alert("Same product max limit is 5. You reached max limit.")
            }

            // alert("This product already exists in cart")
        }
    }

    const createUser = async (user) => {
        const response = await axios.post("/user/register", user, {
            headers: { Authorization: token }
        })
        return response
    }
    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        create: createUser,
        addCart: addCart,
        history: [history, setHistory],
        callback: [callback, setCallback]
    }
}

export default UserAPI
