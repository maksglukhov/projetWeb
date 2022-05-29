import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Manche from "./Manche";

function Events({ admin, isLogged, setIsLogged, setIsAdmin }) {
  const [event, setEvent] = useState("");
  const [apiResponse, setApiResponse] = useState({
    data: [],
    loading: true,
  });
  const [apiResponseManche, setApiResponseManche] = useState({
    data: [],
    loading: true,
  });
  const [date, setDate] = useState(new Date());
  const [isDisabled, setIsDisabled] = useState(true);

  function test() {
    console.log(event);
    console.log(date);
  }

  function sendEvent(e) {
    e.preventDefault();
    //console.log(event);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: event, date: date }),
    };
    fetch("api/events", requestOptions)
      .then((res) => res.json())
      .then((data) =>
        setApiResponse({
          data: data,
          loading: false,
        })
      );
  }
  function deleteEvent(id) {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    };
    fetch("api/events", requestOptions)
      .then((res) => res.json())
      .then((data) =>
        setApiResponse({
          data: data,
          loading: false,
        })
      );
  }
  //TODO add component manche with id in props

  useEffect(() => {
    fetch("api/events")
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

  //console.log(apiResponse.data);

  return (
    <div className='container'>
      {admin ? (
        <div className='input-group mb-3 justify-content-center'>
          <div className='input-group-prepend'>
            <form className='form-inline' onSubmit={(e) => sendEvent(e)}>
              <h2>Enter the following information to add the event</h2>
              <div className='p-2'>
                <input
                  className='form-control'
                  id='event'
                  type='text'
                  required
                  onChange={(e) => setEvent(e.target.value)}
                />
              </div>
              <div className='p-2'>
                <input
                  className='form-control'
                  type='date'
                  required
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className='p-2'>
                <button className='btn btn-primary'>Add event</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <table className='table table-striped'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Event</th>
            <th scope='col'>Date</th>
            {admin ? <th scope='col'>Delete event</th> : <th scope='col'></th>}
          </tr>
        </thead>
        <>
          {apiResponse.data.map((elem, key) => (
            <tbody key={key}>
              <tr style={{ backgroundColor: "#EAB0D0" }}>
                <td>{elem.id}</td>
                <td>{elem.name}</td>
                <td>{elem.date}</td>
                <td>
                  {admin ? (
                    <button
                      className='btn btn-danger'
                      onClick={() => deleteEvent(elem.id)}>
                      <FaTrash />
                    </button>
                  ) : (
                    <div></div>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={5}>
                  <Manche
                    eventId={elem.id}
                    isLogged={isLogged}
                    admin={admin}></Manche>
                </td>
              </tr>
            </tbody>
          ))}
        </>
      </table>
    </div>
  );
}
export default Events;
