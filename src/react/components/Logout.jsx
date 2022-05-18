import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Logout({ refreshMenu }) {
  const navigate = useNavigate();
  function logOut(e) {
    e.preventDefault();
    fetch("api/connection/logout")
      .then((res) => {
        //console.log("log de res", res);
        if (res.status !== 200) {
          throw new Error("error");
        }
        refreshMenu();
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
        <button className='btn-primary danger'>Log out</button>
      </form>
    </div>
  );
}

export default Logout;
