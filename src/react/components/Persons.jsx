import React, { useEffect, useState } from "react";

function Persons({ admin }) {
  const [apiResponse, setApiResponse] = useState({
    data: {},
    loading: true,
  });

  useEffect(() => {
    fetch("api/persons")
      .then((res) => res.json())
      .then((data) =>
        setApiResponse({
          data: data,
          loading: false,
        })
      );
  }, []);

  if (apiResponse.loading) return <h1></h1>;

  function logOutPerson(id) {
    console.log(id);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    };
    fetch("api/persons", requestOptions)
      .then((res) => res.json())
      .then((data) =>
        setApiResponse({
          data: data,
          loading: false,
        })
      );
  }

  if (apiResponse.data === "-1") {
    alert("User exists already");
  }
  return (
    <div className='container'>
      <ul className='card'>
        <table className='table table-striped'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>id</th>
              <th scope='col'>First name</th>
              <th scope='col'>Last name</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {apiResponse.data.map((e, key) => (
              <tr key={key}>
                <td>{e.id}</td>
                <td>{e.first_name}</td>
                <td>{e.last_name}</td>
                <td>
                  {admin ? (
                    <button
                      className='btn btn-danger'
                      onClick={() => logOutPerson(e.id)}>
                      Log out
                    </button>
                  ) : (
                    <div></div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ul>
    </div>
  );
}
export default Persons;
