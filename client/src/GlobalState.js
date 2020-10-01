import React, { createContext, useState, useEffect } from 'react'
import CategoriesAPI from './api/categoriesAPI'
import ProductsAPI from './api/productsAPI'
import UserAPI from './api/userAPI'
import CloudinaryAPI from './api/cloudinaryAPI'

import axios from 'axios'

export const GlobalState = createContext();

export const DataProvider = ({ children }) => { 
    const[token,setToken] = useState(false)  

    const refreshToken = async()=> {
        const res = await axios.get('/user/refresh_token')

        setToken(res.data.accesstoken)
    }

    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin) refreshToken()
    },[])
     
    const state = {
        token : [token,setToken],
        categoriesAPI : CategoriesAPI(token),
        productsAPI : ProductsAPI(),
        userAPI : UserAPI(token),
        cloudinaryAPI : CloudinaryAPI()
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
