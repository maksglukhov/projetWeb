import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Persons({ admin }) {
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const [apiResponse, setApiResponse] = useState({
    data: {},
    loading: true,
  });
  if (!admin) {
    //alert("You are not allowed to access this page");
    navigate("/");
  }
  useEffect(() => {
    fetch("api/persons")
      .then((res) => res.json())
      .then((data) => {
        setApiResponse({
          data: data,
          loading: false,
        });
        console.log(data);
      });
  }, []);

  if (apiResponse.loading) return <h1></h1>;

  function logOutPerson(id) {
    console.log(id);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    };
    fetch("api/admin/logoutuser/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (res.status == 200) {
        alert("User disconnected");
        window.location.reload();
        setUpdate(true);
      } else if (res.status == 401) {
        alert("You are not admin");
      } else if (res.status == 403) {
        alert("Your log-in time expired");
      }
    });
  }

  return (
    <div>
      {admin ? (
        <div className='container'>
          <ul className='card'>
            <table className='table table-striped'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>id</th>
                  <th scope='col'>First name</th>
                  <th scope='col'>Last name</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {apiResponse.data.map((e, key) => (
                  <tr key={key}>
                    <td>{e.id}</td>
                    <td>{e.first_name}</td>
                    <td>{e.last_name}</td>
                    {console.log(e.online)}
                    <td>{e.online ? <>online</> : <>offline</>}</td>
                    <td>
                      {e.online ? (
                        <button
                          className='btn btn-danger'
                          onClick={() => logOutPerson(e.id)}>
                          Log out
                        </button>
                      ) : (
                        <>no action</>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default Persons;
