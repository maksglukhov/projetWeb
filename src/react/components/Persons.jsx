import React, { useEffect, useState } from "react";

function Persons() {
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

  if (apiResponse.loading) return <h1>LOADING ...</h1>;

  return (
    <div className='container'>
      <ul className='card'>
        <table className='table table-striped'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>id</th>
              <th scope='col'>First name</th>
              <th scope='col'>Last name</th>
            </tr>
          </thead>
          <tbody>
            {apiResponse.data.map((e, key) => (
              <tr key={key}>
                <td>{e.id}</td>
                <td>{e.first_name}</td>
                <td>{e.last_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ul>
    </div>
  );
}
export default Persons;
