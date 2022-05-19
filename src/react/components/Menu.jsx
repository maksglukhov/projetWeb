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
  const styleClassNameLi = "nav-item p-2";

  const [isLogged, setIsLogged] = useState(false);

  const refreshMenu = () => {
    if (Cookies.get("token")) {
      console.log("aze");
      setIsLogged(true);
    } else setIsLogged(false);
  };
  return (
    <Router>
      <div >
        <nav className='navbar navbar-expand-lg navbar-light bg-light' >
          <div className='collapse navbar-collapse' id='navbarNav'>
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
                {isLogged ? (
                  <Link to='/logout'>Log out</Link>
                ) : (
                  <Link to='/createuser'>Sign in</Link>
                )}
              </li>
              <li className={styleClassNameLi}>
                {isLogged ? (
                  <Link to='/logout'>Log out</Link>
                ) : (
                  <Link to='/login'>Log in</Link>
                )}
              </li>
              <li className={styleClassNameLi}>
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
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/persons' element={<Persons></Persons>}></Route>
          <Route path='/events' element={<Events></Events>}></Route>
          <Route
            path='/createuser'
            element={<SignIn refreshMenu={refreshMenu}></SignIn>}></Route>
          <Route
            path='/login'
            element={<LogIn refreshMenu={refreshMenu}></LogIn>}></Route>
          <Route
            path='/logout'
            element={<Logout refreshMenu={refreshMenu}></Logout>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default Menu;

/*

<Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/persons'>Persons</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/persons' element={<Persons></Persons>}></Route>
        </Routes>
      </div>
    </Router>

    function Menu() {
  const elem = [
    {
      key: "btnHome",
      name: "Home",
      link: "/",
      component: <Home />,
    },
    {
      key: "btnPersons",
      name: "Persons",
      link: "/persons",
      component: <Persons />,
    },

    {
      key: "btnEvents",
      name: "Events",
      link: "/events",
      component: <Events />,
    },
  ];

  
  return (
    <div className='grid-app'>
      <Router>
        <div className='sidebar d-flex '>
          <ul>
            {aff.map((d, key) => (
              <li key={key}>
                <NavLink to={d.link} activeClassName='active'>
                  {d.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div
          className='bg-light main-content d-flex'
          style={{ minHeight: "100vh", padding: "0" }}>
          <Switch>
            {elem.map((d, key) => (
              <Route key={key} path={d.link}>
                {d.component}
              </Route>
            ))}
          </Switch>
        </div>
      </Router>
    </div>
  );
}
*/
