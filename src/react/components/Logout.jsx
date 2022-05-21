import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Logout({ setIsLogged, setIsAdmin }) {
  const navigate = useNavigate();

  function logOut(e) {
    e.preventDefault();
    fetch("api/connection/logout")
      .then((res) => {
        //console.log("log de res", res);
        if (res.status !== 200) {
          throw new Error("error");
        }
        setIsAdmin(false);
        setIsLogged(false);
        navigate("/");
      })
      .catch((e) => {
        console.log("log", e);
        alert("error log out");
      });
  }
  return (
    <div>
      <form onSubmit={(e) => logOut(e)}>
        <button className='btn btn-lg btn-danger btn-block'>Log out</button>
      </form>
    </div>
  );
}

export default Logout;
