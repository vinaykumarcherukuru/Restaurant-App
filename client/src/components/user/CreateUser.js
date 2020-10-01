import React, { Fragment, useState, useContext } from 'react'

import { GlobalState } from '../../GlobalState';

function CreateUser() {

    /*****************
     State
    ****************/
    const state = useContext(GlobalState)

    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        city: '',
        aadhaar: '',
        role: '',
        gender: 'M'
    })

    // Destructure User
    const {
        firstname,
        lastname,
        email,
        mobile,
        password,
        confirmPassword,
        city,
        aadhaar,
        role,
        gender
    } = user;

    /*****************
      Event Handlers
     ****************/

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');
        setLoading(true);
        alert(JSON.stringify(user))
        await state.userAPI.create(user)
            .then(response => {
                setSuccessMsg(response.data.msg);
                setErrorMsg('');
                setLoading(false);
                setUser({
                    firstname: '',
                    lastname: '',
                    email: '',
                    mobile: '',
                    password: '',
                    confirmPassword: '',
                    city: '',
                    aadhaar: '',
                    role: '',
                    gender: 'M'
                });
            }
            )
            .catch((err) => {
                setSuccessMsg('');
                setErrorMsg(err.response.data.msg);
                setLoading(false);
            });
    }

    /***********************
          Reusable Methods
     ************************/
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


    /*****************
          Views
     ****************/
    const UserForm = () => (
        <Fragment>
            <header className="mb-4"><h4 className="card-title">Create New User</h4></header>

            <form autoComplete="off">
                <div className="form-row">
                    {/* First Name */}
                    <div className="col form-group">
                        <label>First name</label>
                        <input name="firstname" value={firstname} onChange={handleChange} type="text" className="form-control" />
                    </div>

                    {/* Last Name */}
                    <div className="col form-group">
                        <label>Last name</label>
                        <input name="lastname" value={lastname} onChange={handleChange} type="text" className="form-control" />
                    </div>
                </div>

                {/* Email */}
                <div className="form-group">
                    <label>Email</label>
                    <input name="email" value={email} onChange={handleChange} type="email" className="form-control" />
                    <small className="form-text text-muted">Using this Email user can login the website.</small>
                </div>

                <div className="form-row">
                    {/* Password */}
                    <div className="form-group col-md-6">
                        <label>Create password</label>
                        <input name="password" value={password} onChange={handleChange} className="form-control" type="password" />
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group col-md-6">
                        <label>Repeat password</label>
                        <input name="confirmPassword" value={confirmPassword} onChange={handleChange} className="form-control" type="password" />
                    </div>
                </div>

                <div className="form-row">
                    {/* Mobile */}
                    <div className="form-group col-md-6">
                        <label>Mobile</label>
                        <input name="mobile" value={mobile} onChange={handleChange} type="number" className="form-control" />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Role</label>
                        <select name="role" value={role} onChange={handleChange} id="inputState" className="form-control">
                            <option> Choose...</option>
                            <option value="0">User</option>
                            <option value="1">Admin</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    {/* City */}
                    <div className="form-group col-md-6">
                        <label>City</label>
                        <input name="city" value={city} onChange={handleChange} type="text" className="form-control" />
                    </div>

                    {/* Aadhaar */}
                    <div className="form-group col-md-6">
                        <label>Aadhaar Number</label>
                        <input name="aadhaar" value={aadhaar} onChange={handleChange} type="text" className="form-control" />
                    </div>
                </div>

                {/* Gender */}
                <div className="form-group">
                    <label className="custom-control custom-radio custom-control-inline">
                        <input className="custom-control-input" checked={gender === 'M'} defaultChecked type="radio" name="gender" onChange={handleChange} value="M" />
                        {/* <input className="custom-control-input" onChange={handleChange} defaultChecked type="radio" name="gender" defaultValue="M" /> */}
                        <span className="custom-control-label"> Male </span>
                    </label>
                    <label className="custom-control custom-radio custom-control-inline">
                        <input className="custom-control-input" checked={gender === 'F'} type="radio" name="gender" onChange={handleChange} value="F" />
                        <span className="custom-control-label"> Female </span>
                    </label>
                    <label className="custom-control custom-radio custom-control-inline">
                        <input className="custom-control-input" checked={gender === 'O'} type="radio" name="gender" onChange={handleChange} value="O" />
                        <span className="custom-control-label"> Other </span>
                    </label>
                </div>

                <div className="form-group">
                    <button type="submit" onClick={handleSubmit} className="btn btn-outline-primary pull-right"> Create User</button>
                </div>
            </form>
        </Fragment>
    )


    /***********************
       Main Render method
  **************************/

    return (
        <section className="section-content">
            <div className="card col-md-11">
                <article className="card-body">
                    {loading && "Loading ..........."}
                    {successMsg && showSuccessMsg()}
                    {errorMsg && showErrorMsg()}
                    {UserForm()}
                </article>
            </div>
        </section>
    )
}

export default CreateUser
