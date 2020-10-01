import React, { Fragment, useState, useContext } from 'react'
import { GlobalState } from '../../GlobalState';
import CategoryDetails from './CategoryDetails';

function ManageCategory() {
    const state = useContext(GlobalState)

    const [categories] = state.categoriesAPI.categories 
    const successMsg = state.categoriesAPI.success;
    const errorMsg = state.categoriesAPI.error;

    const [categoryName, setCategoryName] = useState({ name: '' })

    const EditCategoryForm = () => (
        <Fragment>
            <header className="card-header">
                <h5 className="card-title">Edit category</h5>
            </header>
            <form className="form-inline ml-3  mt-3">
                <label className="mr-2">Category Name</label>
                <input name="categoryName" value={categoryName.name} onChange={(e) => setCategoryName({ name: e.target.value })} type="text" className="form-control form-control-sm" placeholder />
                <button onClick={(e) => { e.preventDefault(); state.categoriesAPI.update(categoryName); setCategoryName('') }} className="btn btn-outline-primary btn-sm ml-2"> Update Category</button>
                <button onClick={() => setCategoryName({name: ''})} className="btn btn-outline-primary btn-sm ml-2"> Reset</button>
                <img className="ml-3" src="https://dotnettechtips.com/Content/Images/look-here.gif" style={{ height: 32 }} alt="" />
            </form >
            <hr />
        </Fragment>
    )
     
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

    const handleEdit = ()=>{

    }

    return (
        <main className="col-md-12">
            <article className="card">
                {successMsg && showSuccessMsg()}
                {errorMsg && showErrorMsg()}
                {EditCategoryForm()}
                <CategoryDetails categories={categories} editEvent={handleEdit} deleteEvent={state.categoriesAPI.delete} />
            </article>

        </main>



    )
}

export default ManageCategory
