import Axios from 'axios';
import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { GlobalState } from '../../GlobalState';
import axios from 'axios';

function Nav() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart

    const logoutUser = async () => {
        await axios.get('/user/logout')
        localStorage.clear()
        window.location.href = "/";
    }

    // const adminRouter = () => {
    //     return ''
    // }

    // const loggedRouter = () => {
    //     return ''
    // }

    return (
        <nav className="navbar navbar-ligh bg-white border-bottom navbar-expand justify-content-between flex-column flex-lg-row">
            <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_top" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbar_top">
                    <ul className="navbar-nav mr-md-auto">
                        <li>
                            <Link href="#" to={!isLogged ? "/" : "home"} className="navbar-brand">
                                <img src="https://i.ibb.co/LrVwvtP/DTT-logo.jpg" className="logo" height={36} alt="" />
                            </Link>
                        </li>
                    </ul>
                    {isLogged &&
                        <ul className="navbar-nav">
                            <li className="nav-item">

                                <div className="dropdown d-inline-block">
                                    <Link to="/Home" className="icontext mr-4">
                                        <span className="icon">
                                            <i className="fa fa-home" />
                                        </span>
                                        <div className="text">
                                            <p>Dashboard </p>
                                        </div>
                                    </Link>
                                </div>


                                <div className="dropdown d-inline-block">
                                    <Link to="/notification" className="icontext mr-4">
                                        <span className="icon">
                                            <i className="fa fa-bell" />
                                            <span className="notify" style={{ top: '-10px', right: '-15px' }}>0</span>
                                        </span>
                                        <div className="text ml-1">
                                            <p>notifications </p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="dropdown d-inline-block">
                                    <Link to="/orderhistory" className="icontext mr-4">
                                        <i className="icon mr-2 fa fa-history" />
                                        <div className="text">
                                            Order History
                                    </div>
                                    </Link>
                                </div>
                                {isAdmin &&
                                    <div className="dropdown d-inline-block">
                                        <Link to="/paymenthistory" className="icontext mr-4">
                                            <i className="icon mr-2 fa fa-unlock" />
                                            <div className="text">
                                                Payment History
                                    </div>
                                        </Link>
                                    </div>
                                }
                                <div className="dropdown d-inline-block">
                                    <Link to="/home" className="icontext mr-4">
                                        <span className="icon mr-2">
                                            <i className="fa fa-shopping-cart" />
                                            <span className="notify" style={{ top: '-10px', right: '-15px' }}> {cart.length}</span>
                                        </span>
                                        <div className="text ml-2">
                                            Shopping cart
                                    </div>
                                    </Link>
                                </div>
                                <div className="dropdown d-inline-block">
                                    <a href="#" className="icontext mr-4 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                        <img className="icon icon-xs rounded-circle" src="https://dotnettechtips.com/Content/Images/vinay_profilepic.jpg" alt="" />
                                        <div className="text  mt-3">
                                            Vinay Kumar Cherukuru
                                            <br />
                                            <span className="text-muted">{isAdmin ? "Administrator" : ""}</span>
                                        </div>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{ position: 'absolute', willChange: 'transform', top: 0, left: 0, transform: 'translate3d(0px, 32px, 0px)' }}>
                                        <a className="dropdown-item" href="#">My profile</a>
                                        <Link className="dropdown-item" to="/admin">Settings</Link>
                                        <a className="dropdown-item" href="#" onClick={logoutUser}>Log out</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav>

    )
}

export default Nav
