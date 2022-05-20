import React from "react";

function Home({ admin }) {
  console.log("is admin", admin);
  if (admin) {
    return <div>You are admin</div>;
  } else return <div>Hello world</div>;
}

export default Home;
