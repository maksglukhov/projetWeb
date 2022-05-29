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
import Inscriptions from "./Inscriptions";

//verif new user
//change menu
//clé étrangére in token
//to meny re render

function Menu({ admin, setIsAdmin, setIsLogged, isLogged }) {
  const styleClassNameLi = "nav-item p-2";
  const styleClassNameLiRight = "nav-item p-2 navbar-right";

  const linkStyle = { color: "black", fontWeight: "bold" };

  console.log("is logged in", isLogged);
  console.log("is admin in Menu", admin);
  //TODO fetch to get if logged and if admin

  return (
    <Router>
      <div>
        <nav
          className='navbar navbar-expand-lg navbar-dark'
          style={{ backgroundColor: "#C80032" }}>
          <div className='collapse navbar-collapse' id='navbarNav'>
            {isLogged ? (
              <>
                <ul className='nav navbar-dark'>
                  <li className={styleClassNameLi}>
                    <Link
                      style={linkStyle}
                      underline='none'
                      to='/'>
                      Home
                    </Link>
                  </li>
                  {admin ? (
                    <li className={styleClassNameLi}>
                      <Link
                        style={linkStyle}
                        underline='none'
                        to='/persons'>
                        Persons
                      </Link>
                    </li>
                  ) : (
                    <li className={styleClassNameLi}>
                      <Link
                        style={linkStyle}
                        underline='none'
                        to='/inscriptions'>
                        My inscriptions
                      </Link>
                    </li>
                  )}
                  <li className={styleClassNameLi}>
                    <Link
                      style={linkStyle}
                      underline='none'
                      to='/events'>
                      Events
                    </Link>
                  </li>
                </ul>
                <ul className='navbar-nav ml-auto flex-nowrap'>
                  <li className={styleClassNameLiRight}>
                    <Link
                      style={linkStyle}
                      underline='none'
                      to='/logout'>
                      Log out
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul className='nav navbar-nav'>
                  <li className={styleClassNameLi}>
                    <Link
                      style={linkStyle}
                      underline='none'
                      to='/'>
                      Home
                    </Link>
                  </li>
                  <li className={styleClassNameLi}>
                    <Link
                      style={linkStyle}
                      underline='none'
                      to='/events'>
                      Events
                    </Link>
                  </li>
                </ul>
                <ul className='navbar-nav ml-auto flex-nowrap'>
                  <li className={styleClassNameLiRight}>
                    <Link
                      style={linkStyle}
                      underline='none'
                      to='/createuser'>
                      Sign in
                    </Link>
                  </li>
                  <li className={styleClassNameLiRight}>
                    <Link
                      style={linkStyle}
                      underline='none'
                      to='/login'>
                      Log in
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </nav>

        <Routes>
          <Route
            path='/'
            element={
              <Home
                admin={admin}
                setIsLogged={setIsLogged}
                setIsAdmin={setIsAdmin}></Home>
            }></Route>
          <Route
            path='/persons'
            element={
              <Persons
                admin={admin}
                setIsLogged={setIsLogged}
                setIsAdmin={setIsAdmin}></Persons>
            }></Route>
          <Route
            path='/events'
            element={
              <Events
                admin={admin}
                isLogged={isLogged}
                setIsLogged={setIsLogged}
                setIsAdmin={setIsAdmin}></Events>
            }></Route>
          <Route
            path='/inscriptions'
            element={<Inscriptions isLogged={isLogged}></Inscriptions>}></Route>
          <Route
            path='/createuser'
            element={
              <SignIn
                setIsLogged={setIsLogged}
                setIsAdmin={setIsAdmin}></SignIn>
            }></Route>
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
