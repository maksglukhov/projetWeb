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

function Menu({ admin, setIsAdmin, setIsLogged, isLogged }) {
  const styleClassNameLi = "nav-item p-2";

  console.log("is logged in", isLogged);
  //TODO fetch to get if logged and if admin

  return (
    <Router>
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <div className='collapse navbar-collapse' id='navbarNav'>
            {isLogged ? (
              <ul className='navbar-nav'>
                <li className={styleClassNameLi}>
                  <Link to='/'>Home</Link>
                </li>
                <li className={styleClassNameLi}>
                  <Link to='/persons'>Persons</Link>
                </li>
                <li className={styleClassNameLi}>
                  <Link to='/events'>Events</Link>
                </li>
                <li className={styleClassNameLi}>
                  <Link to='/logout'>Log out</Link>
                </li>
              </ul>
            ) : (
              <ul className='navbar-nav'>
                <li className={styleClassNameLi}>
                  <Link to='/'>Home</Link>
                </li>
                <li className={styleClassNameLi}>
                  <Link to='/persons'>Persons</Link>
                </li>
                <li className={styleClassNameLi}>
                  <Link to='/events'>Events</Link>
                </li>
                <li className={styleClassNameLi}>
                  <Link to='/createuser'>Sign in</Link>
                </li>
                <li className={styleClassNameLi}>
                  <Link to='/login'>Log in</Link>
                </li>
              </ul>
            )}
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
            element={<SignIn setIsLogged={setIsLogged}></SignIn>}></Route>
          <Route
            path='/login'
            element={
              <LogIn setIsLogged={setIsLogged} setIsAdmin={setIsAdmin}></LogIn>
            }></Route>
          <Route
            path='/logout'
            element={
              <Logout
                setIsLogged={setIsLogged}
                setIsAdmin={setIsAdmin}></Logout>
            }></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default Menu;
