import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Menu from "./components/Menu";

const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);

function Mymenu() {
  const [admin, setAdmin] = useState(false);
  const setIsAdmin = (value) => {
    setAdmin(value);
  };

  const refreshMenu = () => {
    if (Cookies.get("token")) {
      setIsLogged(true);
      setIsAdmin(admin);
    } else {
      setIsLogged(false);
      setIsAdmin(admin);
    }
  };

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    fetch("api/check")
      .then((res) => {
        //console.log("log de res", res);
        if (res.status === 202) {
          console.log("enter in status 202");
          setIsAdmin(true);
          setIsLogged(true);
          //refreshMenu();
          navigate("/events");
        } else if (res.status === 200) {
          setIsLogged(true);
          //refreshMenu();
          setIsAdmin(false);
          navigate("/events");
        } else {
          throw new Error("error");
        }
      })
      .catch((e) => {
        console.log("No user connected");
      });
  }, []);

  return (
    <Menu
      admin={admin}
      isLogged={isLogged}
      setIsLogged={setIsLogged}
      setIsAdmin={setIsAdmin}></Menu>
  );
}

root.render(
  <main>
    <Mymenu></Mymenu>
  </main>
);
