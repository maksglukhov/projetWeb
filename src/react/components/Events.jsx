import React, { useEffect, useState } from "react";

function Events({ admin }) {
  const [event, setEvent] = useState("");
  const [apiResponse, setApiResponse] = useState({
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
              <div className="p-2">
                <input
                  className='form-control'
                  id='event'
                  type='text'
                  required
                  onChange={(e) => setEvent(e.target.value)}
                />
              </div>
              <div className="p-2">
                <input
                  className='form-control'
                  type='date'
                  required
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="p-2">
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
            <th scope='col'>id</th>
            <th scope='col'>Event</th>
            <th scope='col'>Date</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {apiResponse.data.map((e, key) => (
            <tr key={key}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.date}</td>
              <td>
                {admin ? (
                  <button
                    className='btn btn-danger'
                    onClick={() => deleteEvent(e.id)}>
                    Delete
                  </button>
                ) : (
                  <div></div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Events;
