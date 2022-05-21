import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login({ setIsLogged, setIsAdmin }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [apiResponse, setApiResponse] = useState({
    data: null,
    loading: true,
  });

  //console.log("---------------------------------------");
  //console.log(apiResponse.data);
  if (apiResponse.data === "wrong") {
    alert("Wrong first/last name or password");
  } else if (apiResponse.data == "0") {
    navigate("/events");
  }

  function signIn(e) {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch("api/connection/login", requestOptions).then((res) => {
      //console.log("log de res", res);
      if (res.status === 202) {
        console.log("enter in status 200");
        setIsAdmin(true);
        setIsLogged(true);
        //refreshMenu();
        navigate("/events");
      } else if (res.status === 200) {
        //refreshMenu();
        setIsAdmin(false);
        setIsLogged(true);
        navigate("/events");
      } else {
        //throw new Error("error");
        alert("Wrong username or password");
      }
    });
  }

  if (Cookies.get("token")) {
    //console.log(Cookies.get("token"));
    return <div>There is cookie</div>;
  }

  const styleClassNameInput = "form-control";
  const styleClassNameLabel = "sr-only";
  const styleClassNameDiv = "d-flex p-2";
  return (
    <div className='container'>
      <div className='input-group mb-3 justify-content-center'>
        <div className='input-group-prepend text-center'>
          <form className='form-signin' onSubmit={(e) => signIn(e)}>
            <h1 className='h3 mb-3 font-weight-normal'>Please log in</h1>
            <div className={styleClassNameDiv}>
              <label className={styleClassNameLabel}>Username</label>
              <input
                type='username'
                id='inputUsername'
                className={styleClassNameInput}
                placeholder='Username'
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styleClassNameDiv}>
              <label htmlFor='inputPassword' className={styleClassNameLabel}>
                Password
              </label>
              <input
                type='password'
                id='inputPassword'
                className={styleClassNameInput}
                placeholder='Password'
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className='btn btn-lg btn-primary btn-block'>Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
