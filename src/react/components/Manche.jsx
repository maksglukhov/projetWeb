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
    <table className='table table-striped'>
      <thead className='thead'>
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
  );
}

export default Manche;
