import React, { useState, useRef, useContext } from 'react'

import { GlobalState } from '../../GlobalState';

function CreateProduct() {
    const state = useContext(GlobalState)
    // To bind categories in dropdown
    const [categories] = state.categoriesAPI.categories

    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const [product, setProduct] = useState({ name: '', price: '', description: '', available: '', images: '', category_id: '' })
    const { name, price, description, available, category_id } = product;

    const [imagePreview, setImagePreview] = useState('')
    const fileInput = useRef(null)

    const productForm = () => (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title mb-4">Add new Product</h5>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="col form-group">
                            <div className="media">
                                <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInput} onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files[0]))} ></input>
                                <img src={imagePreview ? imagePreview : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFaHZZOkGeeTKPlax8azb790HbePzxtyC_dA&usqp=CAU'} className="img-md rounded-circle border" style={{ width: 120, height: 120 }} />
                                <div className="mt-4 ml-3 small ">
                                    <a href="#" className="btn btn-sm btn-outline-secondary mb-2" onClick={() => fileInput.current.click()}> <span className="text"> Upload Photo</span> <i className="fa fa-camera"></i>  </a> <a className="btn btn-sm btn-outline-secondary ml-1 mb-2" onClick={() => { setImagePreview(''); fileInput.current.value = null }}><i className="fa fa-trash"></i></a>

                                    <small className="form-text text-muted font-weight-bold"> Image size allowed max up to 1MB</small>
                                    <small className="form-text text-muted  mt-0 font-weight-bold">Image format should be .jpg/png/jpeg</small>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" name="name" value={name} onChange={handleChange} required />
                        </div>
                        <div className="col form-group">
                            <label>Price</label>
                            <input type="number" className="form-control" name="price" value={price} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Category</label>
                            <select id="inputState" name="category_id" value={category_id} onChange={handleChange} className="form-control" required>
                                <option value=""> Choose...</option>
                                {categories && categories.map(item =>
                                    (
                                        <option key={item._id} value={item._id}>{item.name}</option>

                                    )
                                )}

                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Available</label>
                            <select id="inputState" name="available" value={available} onChange={handleChange} className="form-control" required>
                                <option value=""> Choose...</option>
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" name="description" value={description} onChange={handleChange} rows="3" required />
                    </div>
                    <div className="col form-group">

                        <button type="submit" className="btn btn-outline-primary pull-right mr-2">Create Product</button>

                    </div>
                </form>
            </div>
        </div>
    )

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Due to security, preventing users to create product in demo version")
        return false;
        setSuccessMsg('');
        setErrorMsg('');
        setLoading(true);

        const imageFile = fileInput.current.files[0];
        if (!imageFile) {
            setErrorMsg('Please select product image');
            return false;
        }

        // Upload file into Cloudinary and get image URL
        const data = new FormData();
        data.append('file', fileInput.current.files[0]);

        const response = await state.cloudinaryAPI.upload(data)

        console.log(response.public_id)

        if (typeof response === 'undefined' || response === null) {
            setErrorMsg('Something went wrong with Product Image.');
            return false;
        }

        const newProduct = { ...product, images: response }

        // Call Products API and Save new product in database
        await state.productsAPI.create(newProduct)
            .then(res => {
                setSuccessMsg(res.msg);
                setErrorMsg('');
                setLoading(false);
                setImagePreview('')
                fileInput.current.value = null;
                setProduct({ name: '', price: '', description: '', available: '', images: '', category_id: '' });
            }
            )
            .catch(err => {
                setSuccessMsg('');
                setErrorMsg(err.response.data.msg);
                setLoading(false);
                state.cloudinaryAPI.destroy(response.public_id)
            });

    }

    const showSuccessMsg = () => (
        <div className="alert alert-success" role="alert">
            {successMsg}
        </div>
    )
    const showErrorMsg = () => (
        <div className="alert alert-danger" role="alert">
            {errorMsg}
        </div>
    )


    return (

        <div>
            {successMsg && showSuccessMsg()}
            {errorMsg && showErrorMsg()}

            {productForm()}
        </div>
    )
}

export default CreateProduct
