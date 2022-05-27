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
  const styleClassNameLiRight = "nav-item p-2 navbar-right";

  const linkStyle = {color: "white"};
  const linkStyleActive = {color: "white", backgroundColor: "black"};


  console.log("is logged in", isLogged);
  //TODO fetch to get if logged and if admin

  return (
    <Router>
      <div >
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark '>
          <div className='collapse navbar-collapse' id='navbarNav'>
            {isLogged ? (
              <>
                <ul className='nav navbar-dark'>
                  <li className={styleClassNameLi} >
                    <Link style={linkStyle} underline="none" activeStyle={linkStyleActive} to='/' >Home</Link>
                  </li>
                  <li className={styleClassNameLi}>
                    <Link style={linkStyle} underline="none" activeStyle={linkStyleActive} to='/persons'>Persons</Link>
                  </li>
                  <li className={styleClassNameLi}>
                    <Link style={linkStyle} underline="none" activeStyle={linkStyleActive} to='/events'>Events</Link>
                  </li>
                </ul>

                <ul className='navbar-nav ml-auto flex-nowrap'>
                  <li className={styleClassNameLiRight}>
                    <Link style={linkStyle} underline="none" activeStyle={linkStyleActive} to='/logout'>Log out</Link>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul className='nav navbar-nav'>
                  <li className={styleClassNameLi}>
                    <Link style={linkStyle} underline="none" activeStyle={linkStyleActive} to='/'>Home</Link>
                  </li>
                  <li className={styleClassNameLi}>
                    <Link style={linkStyle} underline="none" activeStyle={linkStyleActive} to='/persons'>Persons</Link>
                  </li>
                  <li className={styleClassNameLi}>
                    <Link style={linkStyle} underline="none" activeStyle={linkStyleActive} to='/events'>Events</Link>
                  </li>
                </ul>
                <ul className='navbar-nav ml-auto flex-nowrap'>
                  <li className={styleClassNameLiRight}>
                    <Link style={linkStyle} underline="none" activeStyle={linkStyleActive} to='/createuser'>Sign in</Link>
                  </li>
                  <li className={styleClassNameLiRight}>
                    <Link style={linkStyle} underline="none" activeStyle={linkStyleActive} to='/login'>Log in</Link>
                  </li>
                </ul>
              </>
            )}
          </div>
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
