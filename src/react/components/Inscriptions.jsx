import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Inscription({ isLogged }) {
  const navigate = useNavigate();
  const [apiResponse, setApiResponse] = useState({
    data: [],
    loading: true,
  });

  if (!isLogged) {
    //alert("You are not allowed to access this page");
    navigate("/");
  }

  useEffect(() => {
    fetch("api/events/inscriptions")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setApiResponse({
          data: data,
          loading: false,
        });
      });
  }, []);

  if (apiResponse.loading) return <h1></h1>;

  return (
    <div className='container'>
      <div
        className='custom-scroll m-auto'
        style={{
          padding: 0,
          overflowX: "hidden",
          height: "50vh",
        }}>
        <table
          className='table table-striped'
          style={{
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
          }}>
          <thead
            className='thead'
            style={{ backgroundColor: "#601E80", color: "white" }}>
            <tr>
              <th scope='col'>Event</th>
              <th scope='col'>Manche</th>
              <th scope='col'>Ordre</th>
              <th scope='col'>Date</th>
            </tr>
          </thead>
          <tbody>
            {apiResponse.data.map((elem, key) => (
              <tr key={key}>
                <td>{elem.eventname}</td>
                <td>{elem.manchename}</td>
                <td>{elem.ordre}</td>
                <td>{elem.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inscription;
