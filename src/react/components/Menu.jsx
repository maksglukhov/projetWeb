import React, { useState } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
  Link,
  Routes,
} from "react-router-dom";
import Events from "./Events";
import Persons from "./Persons";
import Home from "./Home";
import SignIn from "./SignIn";
import LogIn from "./LogIn";
import Cookies from "js-cookie";
import Logout from "./Logout";

//verif new user
//change menu
//clé étrangére in token
//to meny re render

function Menu() {
  const [isLogged, setIsLogged] = useState(false);
  const [admin, setAdmin] = useState(false);

  const refreshMenu = () => {
    if (Cookies.get("token")) {
      setIsLogged(true);
    } else setIsLogged(false);
  };

  const setIsAdmin = (value) => {
    setAdmin(value);
  };

  return (
    <Router>
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link to='/'>Home</Link>
              </li>
              <li className='nav-item'>
                <Link to='/persons'>Persons</Link>
              </li>
              <li className='nav-item'>
                <Link to='/events'>Events</Link>
              </li>
              <li className='nav-item'>
                {isLogged ? (
                  <Link to='/logout'>Log out</Link>
                ) : (
                  <Link to='/createuser'>Sign in</Link>
                )}
              </li>
              <li className='nav-item'>
                {isLogged ? (
                  <Link to='/logout'>Log out</Link>
                ) : (
                  <Link to='/login'>Log in</Link>
                )}
              </li>
              <li className='nav-item'>
                <Link to='/logout'>Log out</Link>
              </li>
            </ul>
          </div>
          {/*
          <a className="nav-item nav-link" href='/'>Home</a>
          <a className="nav-item nav-link" href='/persons'>Persons</a>
          <a className="nav-item nav-link" href='/events'>Events</a>
          */}
        </nav>

        <Routes>
          <Route path='/' element={<Home admin={admin}></Home>}></Route>
          <Route
            path='/persons'
            element={<Persons admin={admin}></Persons>}></Route>
          <Route
            path='/events'
            element={<Events admin={admin}></Events>}></Route>
          <Route
            path='/createuser'
            element={<SignIn refreshMenu={refreshMenu}></SignIn>}></Route>
          <Route
            path='/login'
            element={
              <LogIn refreshMenu={refreshMenu} setIsAdmin={setIsAdmin}></LogIn>
            }></Route>
          <Route
            path='/logout'
            element={<Logout refreshMenu={refreshMenu}></Logout>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default Menu;
