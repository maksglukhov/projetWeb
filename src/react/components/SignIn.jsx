import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Connection() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState({
    data: null,
    loading: true,
  });

  //console.log("---------------------------------------");
  //console.log(apiResponse.data);
  if (apiResponse.data === "-1") {
    alert("This user exists");
  } else if (apiResponse.data == "0") {
    navigate("/events");
  }

  function signIn(e) {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        password: password,
      }),
    };
    fetch("api/connection/createuser", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setApiResponse({
          data: data,
          loading: false,
        });
      });
  }

  if (Cookies.get("token")) {
    console.log(Cookies.get("token"));
    return <div>There is cookie</div>;
  }

  return (
    <div className='container'>
      <div className='input-group mb-3'>
        <div className='input-group-prepend'>
          <form className='form-signin' onSubmit={(e) => signIn(e)}>
            <h1 className='h3 mb-3 font-weight-normal'>Please sign in</h1>
            <label className='sr-only'>First Name</label>
            <input
              type='firstname'
              id='inputFirstName'
              className='form-control'
              placeholder='First name'
              required
              autoFocus
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className='sr-only'>Last name</label>
            <input
              type='lastname'
              id='inputLastName'
              className='form-control'
              placeholder='Last name'
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor='inputPassword' className='sr-only'>
              Password
            </label>
            <input
              type='password'
              id='inputPassword'
              className='form-control'
              placeholder='Password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className='btn btn-lg btn-primary btn-block'>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Connection;
