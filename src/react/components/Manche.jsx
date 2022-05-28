import React, { useEffect, useState } from "react";
import MySelect from "./MySelect";

function Manche({ eventId, isLogged, admin }) {
  //console.log(eventId);
  const [refreshTab, setRefreshTab] = useState(false);
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
        //alert("You are not connected");
      } else {
        alert("Inscription failed");
      }
    });
  }

  return (
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
            <th scope='col'>manche</th>
            <th scope='col'>ordre</th>
            {isLogged ? <th scope='col'>action</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {apiResponse.data.map((elem, key) => (
            <tr key={key}>
              <td>{elem.name}</td>
              <td>{elem.ordre}</td>
              <td>
                {isLogged ? (
                  <>
                    {admin ? (
                      <div>
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
