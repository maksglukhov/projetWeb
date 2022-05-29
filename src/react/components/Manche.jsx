import React, { useEffect, useState } from "react";
import MySelect from "./MySelect";
import { FaTrash } from "react-icons/fa";

function Manche({ eventId, isLogged, admin }) {
  //console.log(eventId);
  const [mancheName, setMancheName] = useState("");
  const [mancheOrdre, setMancheOrdre] = useState("");
  const [apiResponse, setApiResponse] = useState({
    data: [],
    loading: true,
  });

  const [res, setRes] = useState("");
  //console.log("here is res", res);

  function updateRes(value) {
    //console.log("here is value", value.value);
    setRes(value.value);
  }

  useEffect(() => {
    fetch("api/manche/" + eventId)
      .then((res) => res.json())
      .then((data) =>
        setApiResponse({
          data: data,
          loading: false,
        })
      );
  }, []);

  function inscription(mancheId, eventId) {
    //console.log("hereeeeeeeeeeeeeeeeee", eventId);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mancheId: mancheId, eventId: eventId }),
    };
    fetch("api/manche/inscription", requestOptions).then((res) => {
      if (res.status == 200) {
        alert("Inscription succeded");
      } else if (res.status == 501) {
        alert("You have already inscrited");
      } else if (res.status == 401) {
        alert("You are not connected");
      } else {
        alert("Inscription failed");
      }
    });
  }

  function inscriptPerson(mancheId, eventId) {
    //console.log("id of user for inscprtion", res);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mancheId: mancheId,
        eventId: eventId,
        userId: res,
      }),
    };
    fetch("api/admin/inscriptuser", requestOptions).then((res) => {
      if (res.status == 200) {
        alert("Inscription succeded");
      } else if (res.status == 501) {
        alert("User already inscrited");
      } else if (res.status == 404) {
        //console.log("hereeeeeeeeeeeeeeeeeeeee************");
        alert("You are not connected");
      } else if (res.status == 401) {
        //console.log("hereeeeeeeeeeeeeeeeeeeee************");
        alert("You are not autorised");
      } else {
        alert("Inscription failed");
      }
    });
  }
  function addManche(e, id) {
    e.preventDefault();
    //console.log(event);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId: id,
        mancheName: mancheName,
        mancheOrdre: mancheOrdre,
      }),
    };
    fetch("api/manche/addmanche", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setApiResponse({
          data: data,
          loading: false,
        });
        //console.log(apiResponse);
      });

    //console.log(id);
  }

  function deleteManche(id, eventId) {
    //console.log(id);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, eventId: eventId }),
    };
    fetch("api/manche/delete", requestOptions)
      .then((res) => res.json())
      .then((data) =>
        setApiResponse({
          data: data,
          loading: false,
        })
      );
  }

  return (
    <div
      className='custom-scroll m-auto'
      style={{
        padding: 0,
        overflowX: "hidden",
        maxHeight: "50vh",
      }}>
      {admin ? (
        <form className='form-inline' onSubmit={(e) => addManche(e, eventId)}>
          <h2>Enter the following information to add the macnhe</h2>
          <input
            className='form-control'
            id='event'
            type='text'
            placeholder='name of manche'
            required
            onChange={(e) => setMancheName(e.target.value)}
          />
          <input
            className='form-control'
            type='number'
            min={0}
            placeholder='ordre of manche'
            required
            onChange={(e) => setMancheOrdre(e.target.value)}
          />
          <button className='btn btn-primary'>Add manche</button>
        </form>
      ) : (
        <div></div>
      )}
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
            <th scope='col'>manche</th>
            <th scope='col'>ordre</th>
            {isLogged ? <th scope='col'>action</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {apiResponse.data.map((elem, key) => (
            <tr key={key}>
              <td style={{ width: "auto" }}>{elem.name}</td>
              <td style={{ width: "auto" }}>{elem.ordre}</td>
              <td style={{ width: "max-content" }}>
                {isLogged ? (
                  <>
                    {admin ? (
                      <div style={{ display: "flex", width: "max-content" }}>
                        <MySelect
                          service={"api/persons/forselect"}
                          updateObjet={updateRes}
                          refresh={false}
                        />
                        <button
                          className='btn btn-primary'
                          onClick={() => inscriptPerson(elem.id, eventId)}>
                          inscript person
                        </button>
                        <button
                          className='btn btn-danger'
                          onClick={() => deleteManche(elem.id, eventId)}>
                          <FaTrash />
                        </button>
                      </div>
                    ) : (
                      <button
                        className='btn btn-primary'
                        onClick={() => inscription(elem.id, eventId)}>
                        inscription
                      </button>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Manche;
