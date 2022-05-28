import React, { useEffect, useState } from "react";

function Manche({ eventId, refreshTabManche }) {
  console.log(eventId);
  const [refreshTab, setRefreshTab] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    data: [],
    loading: true,
  });

  // if (refreshTabManche) {
  //   fetch("api/events/manche/" + eventId)
  //     .then((res) => res.json())
  //     .then((data) =>
  //       setApiResponse({
  //         data: data,
  //         loading: false,
  //       })
  //     );
  // }
  useEffect(() => {
    fetch("api/events/manche/" + eventId)
      .then((res) => res.json())
      .then((data) =>
        setApiResponse({
          data: data,
          loading: false,
        })
      );
  }, []);

  return (
    <div className='custom-scroll m-auto' 
      style={{
        padding: 0,
        overflowX: "hidden", 
        height: "50vh"}}>
      <table className='table table-striped' style={{ width: "100%", alignContent: "center", justifyContent: "center"}}>
        <thead className='thead' style={{ backgroundColor: "#601E80", color: "white"}}>
          <tr>
            <th scope='col'>manche</th>
            <th scope='col'>ordre</th>
          </tr>
        </thead>
        <tbody>
          {apiResponse.data.map((elem, key) => (
            <tr key={key}>
              <td>{elem.name}</td>
              <td>{elem.ordre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Manche;
