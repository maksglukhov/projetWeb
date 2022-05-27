import React from "react";

function Home({ admin }) {
  console.log("is admin", admin);
  if (admin) {
    return <div className="text-center">You are admin</div>;
  } else return <div className="text-center">Hello world</div>;
}

export default Home;
