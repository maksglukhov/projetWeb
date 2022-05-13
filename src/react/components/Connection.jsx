import React, { useEffect, useState } from "react";

function Connection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  function signIn() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    };
    fetch("api/persons", requestOptions);
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
              onClick={() => signIn()}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Connection;
