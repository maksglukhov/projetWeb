import React, { useEffect, useState } from "react";

function Home({ admin, setIsLogged, setIsAdmin, isLogged }) {
  useEffect(() => {
    fetch("api/check")
      .then((res) => {
        //console.log("log de res", res);
        if (res.status === 202) {
          console.log("enter in status 202");
          setIsAdmin(true);
          setIsLogged(true);
          //refreshMenu();
          //navigate("/events");
        } else if (res.status === 200) {
          console.log("enter in status 200");
          setIsLogged(true);

          //refreshMenu();
          setIsAdmin(false);
          console.log("is admin", admin);
          //navigate("/events");
        } else {
          throw new Error("error");
        }
      })
      .catch((e) => {
        console.log("No user connected");
      });
  }, []);
  console.log("is admin", admin);

  const name = <p>Site créé par : Glukhov Maks, Devémy Thibaud et Axel Thebault</p>;



  if (admin) {
    return (
      <>
        <div className='text-center'>
          <br />
          <h4>En tant qu'admin, vous pouvez :</h4>
          <br />
          <p>
            - Voir la listes des personnes avec leur statut, et si elles sont
            connectées, vous pouvez les déconnecter.
          </p>
          <p>
            - Ajouter des évènements et des manches d'évènements, et vous pouvez
            supprimer un évènement et une manche
          </p>
          <p>- Vous pouvez inscrire un autre user à une manche d'évènement</p>
          <p>- Vous pouvez vous déconnecter</p>
        </div>
        <div style={{position: "absolute", bottom: "0", textAlign: "center", width: "100%",  background: "black", color: "white", fontWeight: "bold"}}>
          {name}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className='text-center'>
          {isLogged ? (
            <div className='text-center'>
              <br />
              <h4>En tant qu'utilisateur connecté, vous pouvez :</h4>
              <br />
              <p>- Vous inscrire à des manches d'évènements</p>
              <p>- Vous pouvez voir vos inscriptions</p>
              <p>- Vous pouvez vous déconnecter</p>
            </div>
          ) : (
            <div className='text-center'>
              <br />
              <h4>En tant qu'utilisateur non-connecté, vous pouvez : </h4>
              <br />
              <p>- Créer un compte user</p>
              <p>- Vous connecter</p>
              <p>- Consulter les évènements</p>
            </div>
          )}
        </div>
        <div style={{position: "absolute", bottom: "0", textAlign: "center", width: "100%", background: "black", color: "white", fontWeight: "bold"}}>
          {name}
        </div>
      </>
    );
  }
}

export default Home;
