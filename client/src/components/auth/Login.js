import React, { Fragment, useState } from 'react'
import axios from 'axios'
// import { useHistory } from 'react-router-dom';

function Login() {
    const [user, setUser] = useState({
        email: '', password: ''
    })

    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)

    /*****************
      Event Handlers
     ****************/

    const onChangeInput = e => {
        const { name, value } = e.target; // destructure event target "name" and "value"
        setUser({ ...user, [name]: value })
    }

    const loginSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        try {
            await axios.post('/user/login', { ...user })

            localStorage.setItem('firstLogin', true)

            window.location.href = "/home";
            // history.push('dashboard');
        } catch (err) {
            setLoading(false);
            setErrorMsg(err.response.data.msg);
        }

        /* authService.signin(formData)
             .then(response => {
                 history.push('dashboard');
             }
             )
             .catch((err) => {
                 setErrorMsg(err.response.data.msg);
                 setLoading(false);
             });*/
    }

    /*****************
      Views
     ****************/

    const showErrorMsg = () => (
        <div className="alert alert-danger" role="alert">
            {errorMsg}
        </div>
    )

    const signinForm = () => (

        <Fragment>
            <img className="pull-right mr-1" src="https://media1.tenor.com/images/46318295b23572989172216cb77fdcfc/tenor.gif?itemid=12302382" alt="" style={{ height: 70 }}></img>
 
            <h4 className="card-title mb-4 mt-4">Sign in</h4>
            <form onSubmit={loginSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input name="email" value={user.email} onChange={onChangeInput} className="form-control" placeholder="ex. name@domain.com" type="email" required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input name="password" value={user.password} onChange={onChangeInput} className="form-control" placeholder="******" type="password" required />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary pull-right mr-2"> Login</button>
                </div>
            </form>
        </Fragment>
    )
    return (
        <section className="section-content padding-y"> 
            <div className="card mx-auto" style={{ maxWidth: 520, marginTop: 40 }}>
                <div className="card-body">
                    {/* <h4 className="card-title mb-4">Sign in with One Time Password (OTP)</h4> */}
                    {/* <a href="#" className="btn btn-facebook btn-block mb-2"> <i className="fab fa-facebook-f" /> &nbsp;  Sign in with Facebook</a>
                    <a href="#" className="btn btn-google btn-block mb-4"> <i className="fab fa-google" /> &nbsp;  Sign in with Google</a> */}
                    {/* <form>
                         <div className="form-group">
                            <label>Mobile Number</label>
                            <input name className="form-control" placeholder="ex. name@domain.com" type="email" />
                        </div>
                        <div className="form-group">
                            <a className="float-right" href="#">Request OTP</a>
                            <label>Password</label>
                            <input className="form-control" placeholder="******" type="password" />
                        </div> 
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"> Login</button>
                        </div> 
                    </form> */}
                     {errorMsg && showErrorMsg()}
                    <div style={{borderLeft:'1px solid green', borderWidth:3}}>&nbsp;&nbsp;<strong>User Name : admin@admin.com</strong><br/>&nbsp;&nbsp;<strong>Password : 123456</strong></div>
                   
                    {signinForm()}
                </div>
            </div>
        </section>
    )
}

export default Login
