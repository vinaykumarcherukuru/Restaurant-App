import { useState, useEffect } from 'react'
import axios from 'axios';

function CategoriesAPI(token) {
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get("/api/category")
            setCategories(res.data)
        }
        getCategories()
    }, [])


    const createCategory = async (name) => {
        alert("Due to security, preventing users to create product in demo version")
        return false;
        setSuccessMsg();
        setErrorMsg();
        setLoading(true);

        await axios.post("/api/category/", name, {
            headers: { Authorization: token }
        })
            .then(res => {
                setSuccessMsg(res.data.msg);
                setErrorMsg('');
                setLoading(false);
                setCategories([res.data.category, ...categories])
            }
            )
            .catch(err => {
                setSuccessMsg('');
                setErrorMsg(err.response.data.msg);
                setLoading(false);
            });
    }

    const updateCategory = async (Editcategory) => {
        alert("Due to security, preventing users to create product in demo version")
        return false;
        setSuccessMsg('');
        setErrorMsg('');
        setLoading(true);

        await axios.put(`/api/category/${Editcategory.id}`, Editcategory, {
            headers: {Authorization: token}
        })
            .then(res => {
                setSuccessMsg(res.data.msg);
                setErrorMsg('');
                setLoading(false);

                // 1. Make a shallow copy of the items
                const allCategories = [...categories]
                // 2. Find index of current updated item by ID
                const index = categories.findIndex(c => c._id === Editcategory.id);
                // 3. Modifiy the value of property by Index
                allCategories[index].name = Editcategory.name;
                // 4. Update State array with new changes
                setCategories(allCategories)
            }
            )
            .catch(err => {
                setSuccessMsg('');
                setErrorMsg(err.response.data.msg);
                setLoading(false);
            });
    }

    const deleteCategory = async (id) => {
        alert("Due to security, preventing users to create product in demo version")
        return false;
        setSuccessMsg('');
        setErrorMsg('');
        setLoading(true);

        await axios.delete(`/api/category//${id}`, {
            headers: {Authorization: token}
        }).then(res => {
            setSuccessMsg(res.data.msg);
            setErrorMsg('');
            setLoading(false);

            const filterCategories = categories.filter(c => c._id !== id)
            setCategories(filterCategories)
        }
        )
            .catch(err => {
                setSuccessMsg('');
                setErrorMsg(err.response.data.msg);
                setLoading(false);
            });
    }

    return {
        categories: [categories, setCategories],
        create: createCategory,
        delete: deleteCategory,
        update: updateCategory,
        success: successMsg,
        error: errorMsg
    }
}

export default CategoriesAPI
