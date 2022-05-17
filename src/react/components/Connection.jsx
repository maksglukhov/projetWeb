import React, { useEffect, useState } from "react";

function Connection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState({
    data: [],
    loading: true,
  });

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
    fetch("api/connection", requestOptions)
      .then((res) => res.json())
      .then((data) =>
        setApiResponse({
          data: data,
          loading: false,
        })
      );
    console.log(apiResponse);
    if (apiResponse.data === "-1") {
      alert("This user exists");
    }
  }

  return (
    <div className='container'>
      <div className='input-group mb-3'>
        <div className='input-group-prepend'>
          <form className='form-signin'>
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

            <button
              className='btn btn-lg btn-primary btn-block'
              onClick={(e) => signIn(e)}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Connection;
