import React, { Fragment, useState, useContext } from 'react'
import { GlobalState } from '../../GlobalState';
import CategoryDetails from './CategoryDetails'; 

function CreateCategory() {
    const state = useContext(GlobalState)

    const [categories] = state.categoriesAPI.categories
    const successMsg = state.categoriesAPI.success;
    const errorMsg = state.categoriesAPI.error;

    const [categoryName, setCategoryName] = useState({ id: '', name: '' })
    const [isEdit, setisEdit] = useState(false)

    const categoryForm = () => (
        <Fragment>

            <header className="card-header">
                <h5 className="card-title">Add new category</h5>
            </header>

            <form className="form-inline ml-3  mt-3">
                <label className="mr-2">Category Name</label>
                <input name="categoryName" required value={categoryName.name} onChange={(e) => setCategoryName({ ...categoryName, name: e.target.value })} type="text" className="form-control form-control-sm" />
                {isEdit ?
                    (<Fragment> <button onClick={(e) => { e.preventDefault(); state.categoriesAPI.update(categoryName); setCategoryName({ id: '', name: '' }); setisEdit(false) }} className="btn btn-outline-primary btn-sm ml-2"> Update Category</button>
                        <button onClick={() => { setisEdit(false); setCategoryName({ id: '', name: '' }) }} className="btn btn-outline-primary btn-sm ml-2"> Reset</button>
                    </Fragment>
                    )
                    :
                    (<Fragment>
                        <button onClick={(e) => { e.preventDefault(); state.categoriesAPI.create(categoryName); setCategoryName({ id: '', name: '' }) }} className="btn btn-outline-primary btn-sm ml-2"> Add Category</button>
                    </Fragment>)
                }
                < img className="ml-3" src="https://dotnettechtips.com/Content/Images/look-here.gif" style={{ height: 32 }} alt="" />

            </form >
            <hr />
        </Fragment>
    )

    const handleEdit = (category) => {
        setisEdit(true);
        setCategoryName({ id: category._id, name: category.name })
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
        <main className="col-md-12">
            <article className="card">
                {successMsg && showSuccessMsg()}
                {errorMsg && showErrorMsg()}
                {categoryForm()}
                <CategoryDetails categories={categories} editEvent={handleEdit} deleteEvent={state.categoriesAPI.delete} />
            </article>

        </main>



    )
}

export default CreateCategory
