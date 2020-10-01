import React, { useContext } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import AdminDashboard from '../components/admin/AdminDashboard';
import Login from '../components/auth/Login';
import Cart from '../components/cart/Cart';
import Home from '../components/home/Home';
import notification from '../components/notification/notification';
import OrderHistory from '../components/history/orderHistory';
import PaymentHistory from '../components/history/paymentHistory';
import { GlobalState } from '../GlobalState';
import Notfound from '../components/errors/NotFound';

function Routes() {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  return (
    <Switch >
      <Route exact path="/" component={!isLogged ? Login : Home} />
      <Route path='/Home' component={Home} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/cart" component={Cart} />
      <Route path="/orderhistory" component={isLogged ? OrderHistory : Notfound} />
      <Route path="/paymenthistory" component={isLogged ? PaymentHistory : Notfound} />
      <Route path="/notification" component={notification} />
      <Route path="*" exact component={Notfound} />
    </ Switch>
  );
}

export default Routes
