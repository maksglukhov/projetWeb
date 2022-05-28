import React, { useEffect, useState } from "react";

function Home({ admin, setIsLogged, setIsAdmin }) {
  useEffect(() => {
    fetch("api/check")
      .then((res) => {
        //console.log("log de res", res);
        if (res.status === 202) {
          console.log("enter in status 202");
          setIsAdmin(true);
          setIsLogged(true);
          //refreshMenu();
          //navigate("/events");
        } else if (res.status === 200) {
          console.log("enter in status 200");
          setIsLogged(true);

          //refreshMenu();
          setIsAdmin(false);
          console.log("is admin", admin);
          //navigate("/events");
        } else {
          throw new Error("error");
        }
      })
      .catch((e) => {
        console.log("No user connected");
      });
  }, []);
  console.log("is admin", admin);
  if (admin) {
    return <div className='text-center'>You are admin</div>;
  } else return <div className='text-center'>Hello world</div>;
}

export default Home;
