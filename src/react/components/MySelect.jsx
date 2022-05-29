import React, { useState, useEffect } from "react";
import Select from "react-select";

function MySelect({ service, updateObjet }) {
  const [apiResponse, setApiResponse] = useState({
    data: {},
    loading: true,
  });

  useEffect(() => {
    fetch(service)
      .then((res) => res.json())
      .then((data) => {
        setApiResponse({
          data: data,
          loading: false,
        });
      });
  }, [service]);

  const handleChange = (event) => {
    const value = event;
    updateObjet(value);
  };

  if (apiResponse.loading) return <p>LOADING ...</p>;
  return (
    <div style={{ width: "100px", minWidth: "15vw" }}>
      <Select
        onChange={handleChange}
        options={apiResponse.data}
        style={{ width: "max-content" }}
      />
    </div>
  );
}
export default MySelect;
