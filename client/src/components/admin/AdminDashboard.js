import React from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import CreateCategory from '../category/CreateCategory'
// import ManageCategory from '../category/ManageCategory'
import CreateProduct from '../product/CreateProduct'
import CreateUser from '../user/CreateUser'
import ManageProduct from '../product/ManageProduct'
import ManageUser from '../user/ManageUser'  

function AdminDashboard() {

    const AdminNav = () => (
        <div>
            <h5 className="doc-title-sm">Settings</h5>
            <div className="row"> 
                    <aside className="col-md-12">
                        {/*   SIDEBAR   */}
                        <ul className="list-group">
                            <NavLink className="list-group-item" to="/admin/category"> Create Category </NavLink>
                            <NavLink className="list-group-item" to="/admin/product"> Create Product </NavLink>
                            <NavLink className="list-group-item" to="/admin/user"> Create User </NavLink>
                        </ul>
                    </aside> 

                    <aside className="col-md-12 mt-3">
                        {/*   SIDEBAR   */}

                        <ul className="list-group">
                            {/* <NavLink className="list-group-item" to="/admin/manageCategory"> Manage Category </NavLink> */}
                            <NavLink className="list-group-item" to="/admin/manageProduct"> Manage Product </NavLink>
                            <NavLink className="list-group-item" to="/admin/manageUser"> Manage User </NavLink>
                        </ul>
                    </aside> 
            </div>
        </div>

    )


    return (
        <section className="section-content padding-y">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">

                        {AdminNav()}

                    </div>
                    <div className="col-md-9">
                        <Switch>
                            <Route exact path="/admin/category" component={CreateCategory} />
                            <Route exact path="/admin/product" component={CreateProduct} />
                            <Route exact path="/admin/user" component={CreateUser} />

                            <Route exact path="/admin/manageProduct" component={ManageProduct} />
                            <Route exact path="/admin/manageUser" component={ManageUser} />
                        </Switch>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default AdminDashboard
